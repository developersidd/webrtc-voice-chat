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
    this.speakers = room.speakers || [];
    this.listeners = room.listeners || [];
  }
}

export default RoomDto;
