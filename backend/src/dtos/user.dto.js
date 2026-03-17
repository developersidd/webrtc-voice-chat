class UserDto {
  _id;
  email;
  createdAt;
  refreshToken;
  activated;
  avatar;
  constructor(user) {
    this._id = user._id;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.avatar = user.avatar ? `${process.env.BASE_URL}${user.avatar}` : "";
    this.refreshToken = user.refreshToken;
    this.activated = user.activated;
  }
}

export default UserDto;
