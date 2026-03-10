import "./lib/env.js"
import express from "express";
import ApiError from "./lib/ApiError.js";
import AuthRouter from "./routes/auth.routes.js";

const app = express();
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
