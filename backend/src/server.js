import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { SOCKET_EVENTS } from "../socket/socket.events.js";
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

// socket user maping
const socketUserMap = {};

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on(SOCKET_EVENTS.JOIN, ({ roomId, user }) => {
    console.log("User joined room:", { roomId, user });
    socketUserMap[socket.id] = user;

    // get clients from the room
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    console.log("Clients in room:", clients);

    // add the clients to the room
    clients.forEach((clientId) => {
      console.log("sending msg")
      // send a message to the client to add the peer
      io.to(clientId).emit(SOCKET_EVENTS.ADD_PEER, {
        peerId: socket.id, // peer id of the new user
        createOffer: false, //
        user,
      });

      // send a message to the new user to add the existing peer
      socket.emit(SOCKET_EVENTS.ADD_PEER, {
        peerId: clientId, // peer id of the existing user
        createOffer: true, //
        user: socketUserMap[clientId], // user info of the existing user
      });
    });
    socket.join(roomId); // join the room
  });

  // Handle Relay Ice
  socket.on(SOCKET_EVENTS.RELAY_ICE, ({ peerId, icecandidate }) => {
    io.to(peerId).emit(SOCKET_EVENTS.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  // Handle Relay SDP (Session Description Protocol)
  socket.on(SOCKET_EVENTS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    io.to(peerId).emit(SOCKET_EVENTS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  });

  const leaveRoom = () => {
    const { rooms } = socket;
    Array.from(rooms).forEach((roomId) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      // Saying clients to remove the peer
      clients.forEach((clientId) => {
        // send a message to the client to remove the peer
        io.to(clientId).emit(SOCKET_EVENTS.REMOVE_PEER, {
          peerId: socket.id,
          userId: socketUserMap[socket.id]?.id,
        });
        // send a message to the leaving user to remove the existing peer
        socket.emit(SOCKET_EVENTS.REMOVE_PEER, {
          peerId: clientId,
          userId: socketUserMap[clientId]?.id,
        });
      });
      // remove the user from the room
      socket.leave(roomId);
    });

    // remove the user from the socketUserMap
    delete socketUserMap[socket.id];
  };

  // Leaving the room
  socket.on(SOCKET_EVENTS.LEAVE, leaveRoom);
  socket.on("disconnecting", leaveRoom)
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
