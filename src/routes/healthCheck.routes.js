import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controllers.js";

const router = Router();
// we can create many routes with different controllers
router.route("/").get(healthCheck);
// router.route("/test").get(healthCheck);

export { router };
