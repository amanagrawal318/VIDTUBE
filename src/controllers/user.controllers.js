import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // when Body is not provided
  if (Object.keys(req.body).length === 0) {
    throw new ApiError(400, "No fields found");
  }

  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some(
      (field) => field === undefined || field === null || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(400, "User Already exists with username or email");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
  } catch (error) {
    throw new ApiError(500, "Failed to upload avatar file");
  }

  let coverImage;
  try {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
  } catch (error) {
    throw new ApiError(500, "Failed to upload cover image file");
  }

  try {
    const user = await User.create({
      fullName,
      email,
      password,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      username: username.toLowerCase(),
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(400, "Something went wrong during registration");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, createdUser, "User is registered successfully")
      );
  } catch (error) {
    console.log("User creation failed");

    if (avatar) await deleteFromCloudinary(avatarLocalPath);
    if (coverImage) await deleteFromCloudinary(coverImageLocalPath);

    throw new ApiError(
      500,
      "Something went wrong during user registration and images were deleted if uploaded"
    );
  }
});

export default registerUser;
