import cors from "cors";
import express from "express";
import connectDB from "./db/index.js";
import ApiError from "./lib/ApiError.js";
import "./lib/env.js";
import AuthRouter from "./routes/auth.routes.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: [process.env.CORS_ORIGIN],
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Welcome to SiddikHouse");
});

app.use("/api/v1/auth", AuthRouter);

// 404 error handler
app.use((req, res, next) => {
  const error = new ApiError(404, "Page Not Found!");
  next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    ...err,
    status,
    data: null,
    message,
  });
});

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.on("error", () => {
      console.log("Application isn't ready to run yes!!");
    });
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed!!", err);
  });
