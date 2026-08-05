import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import connectDB from "./db/index.js";
import ApiError from "./lib/ApiError.js";
import "./lib/env.js";
import AuthRouter from "./routes/auth.routes.js";
import RoomRouter from "./routes/room.routes.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    credentials: true,
    origin: [process.env.CORS_ORIGIN],
  }),
);
app.use("/storage", express.static(path.resolve("src", "storage")));
//console.log("🚀 ~ :", import.meta.url)
//console.log(`🚀 ~ path ):`, path.resolve("storage"))
app.use(express.json({ limit: "8mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("Welcome to SiddikHouse");
});

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/rooms", RoomRouter);

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
});

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
    data: null,
    message,
  });
});

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    server.on("error", () => {
      console.log("Application isn't ready to run yes!!");
    });
    server.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("🚀🚀 MONGODB connection failed!!", err);
  });
