type Response<T> = {
  statusCode: number;
  message: string;
  data: T;
};

type User = {
  email: string;
  refreshToken: string;
  activated: boolean;
  avatar: string;
  createdAt: string;
  username: string;
  bio: string;
  fullName: string;
  id: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  otp: {
    email: string;
    hash: string;
  };
};

type RoomType = "open" | "social" | "private";

type Room = {
  id: string;
  topic: string;
  roomType: RoomType;
  speakers: User[];
  listeners: User[];
  createdAt: string;
  updatedAt: string;
};

export type { AuthState, Response, Room, RoomType, User };
