## Connected the MongoDB Database

1. **Created the Express server**  
   Set up an Express server for handling API requests.

2. **Added necessary packages**  
   Installed `cors` and `dotenv` packages. Configured environment variables in the `.env` file.

3. **Created the Database and connected to MongoDB**  
   Initialized a new database and established a connection to MongoDB and server will start when DB is connected sUccesfully

### Steps to Connect the Database

- Use **MongoDB Atlas** and copy the connection URL from the "Connect" section.
- Add the URL to the `.env` file under a suitable variable name.

### [DataBase Design](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

## Added the models

- Added the different schema using mongoose like comments, user, video etc.
- install the package `mongoose-aggregate-paginate-v2` for aggregation
- added aggregation in video and comment model

## Completed user registration

- user is registered in to mongodb and avatar & cover image url is stored in cloudinary
- created user.controllers file and `/register` route to register the user
- When testing on postman add the users field in the `raw-data` section in body
- created deleteFiles from cloudinary if user creation is failed.

### Important changes to be made

- Update the **UserID** and **Password** in the connection string.
- Remove any trailing `/` at the end of the URL.
- Add the `API key, secret key` of cloudinary in .env.
- create the `public/temp` folder in root location so that local file path can be set
