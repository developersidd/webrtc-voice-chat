import express from "express";
import roomController from "../controllers/room.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router
  .route("/", verifyJWT)
  .post(roomController.createRoom)
  .get(roomController.getRooms);
router
  .route("/:roomId", verifyJWT)
  .get(roomController.getRoom);

export default router;
