import RoomDto from "../dtos/room.dto.js";
import ApiError from "../lib/ApiError.js";
import ApiResponse from "../lib/ApiResponse.js";
import asyncHandler from "../lib/asyncHandler.js";
import roomService from "../services/room.services.js";
class RoomController {
  createRoom = asyncHandler(async (req, res) => {
    const { topic, roomType } = req.body;
    if (!topic || !roomType) {
      throw new ApiError(400, "Room topic and type are required");
    }
    const room = await roomService.createRoom({
      topic,
      roomType,
      ownerId: req.user._id,
    });
    const roomDto = new RoomDto(room);
    const ApiRes = new ApiResponse(
      201,
      { room: roomDto },
      `Room '${topic}' created successfully`,
    );
    res.status(201).json(ApiRes);
  });
}

export default new RoomController();
