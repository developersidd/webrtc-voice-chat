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

    return room
  };
}

export default new RoomService();
