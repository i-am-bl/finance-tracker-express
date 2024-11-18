import { StatusCodes } from "http-status-codes";
import msg from "../constants/messages.js";

export class UserNotExist extends Error {
  constructor(
    message = msg.user.USER_NOT_EXIST,
    statusCode = StatusCodes.BAD_REQUEST
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}
export class UserUnauthorized extends Error {
  constructor(
    message = msg.user.UNAUTHORIZED_USER,
    statusCode = StatusCodes.FORBIDDEN
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}
