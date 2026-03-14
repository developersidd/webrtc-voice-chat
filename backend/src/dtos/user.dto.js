class UserDto {
  _id;
  email;
  createdAt;
  refreshToken;
  activated;

  constructor(user) {
    this._id = user._id;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.refreshToken = user.refreshToken;
    this.activated = user.activated;
  }
}

export default UserDto;
