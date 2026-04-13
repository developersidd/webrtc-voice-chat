import express from "express";
import roomController from "../controllers/room.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/", verifyJWT, roomController.createRoom);

export default router;
