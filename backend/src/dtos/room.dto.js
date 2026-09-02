import UserDto from "./user.dto.js";
class RoomDto {
  id;
  topic;
  roomType;
  ownerId;
  speakers;
  listeners;
  constructor(room) {
    this.id = room._id;
    this.topic = room.topic;
    this.roomType = room.roomType;
    this.ownerId = room.ownerId;
    this.speakers = room.speakers.map((speaker) => new UserDto(speaker)) || [];
    this.listeners = room.listeners.map((listener) => new UserDto(listener)) || [];
  }
}

export default RoomDto;
