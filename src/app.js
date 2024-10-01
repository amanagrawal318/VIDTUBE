import express from "express";
import cors from "cors";
import { router as HealthCheckRouter } from "./routes/healthCheck.routes.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//common middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// route
app.use("/api/v1/healthcheck", HealthCheckRouter);


export { app };
