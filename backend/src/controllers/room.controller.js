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
  getRooms = asyncHandler(async (req, res) => {
    const rooms = await roomService.getRooms();
    const roomDtos = rooms.map((room) => new RoomDto(room));
    const ApiRes = new ApiResponse(
      200,
      { rooms: roomDtos },
      "Rooms fetched successfully",
    );
    res.status(200).json(ApiRes);
  });
  getRoom = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const room = await roomService.getRoomById(roomId);
    if (!room) {
      throw new ApiError(404, "Room not found");
    }
    const roomDto = new RoomDto(room);
    const ApiRes = new ApiResponse(
      200,
      { room: roomDto },
      "Room fetched successfully",
    );
    res.status(200).json(ApiRes);
  });
}

export default new RoomController();
