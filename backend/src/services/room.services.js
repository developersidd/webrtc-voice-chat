import Room from "../models/room.model.js";

class RoomService {
  createRoom = async (payload) => {
    const { topic, roomType, ownerId } = payload;
    const room = Room.create({
      topic,
      roomType,
      ownerId,
      speakers: [ownerId],
    });

    return room;
  };
  getRooms = async () => {
    const rooms = await Room.find()
      .populate({
        path: "listeners",
        select: "username email avatar fullName",
      })
      .populate({
        path: "speakers",
        select: "username email avatar fullName",
      });
    return rooms;
  };
  getRoomById = async (roomId) => {
    const room = await Room.findById(roomId).populate({
      path: "speakers",
      select: "username email avatar fullName",
    }).populate({
      path: "listeners",
      select: "username email avatar fullName",
    });
    return room;
  };
}

export default new RoomService();
