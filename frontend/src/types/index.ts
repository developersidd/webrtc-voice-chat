type ResponseType<T> = {
  statusCode: number;
  message: string;
  data: T;
};

type UserType = {
  email: string;
  refreshToken: string;
  activated: boolean;
  avatar: string;
  createdAt: string;
  username: string;
  bio: string;
  fullName: string;
  _id: string;
};

type AuthStateType = {
  isAuthenticated: boolean;
  user: UserType | null;
  otp: {
    email: string;
    hash: string;
  };
};

export type { AuthStateType, ResponseType, UserType };
