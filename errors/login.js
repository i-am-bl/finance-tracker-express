import { StatusCodes } from "http-status-codes";
import msg from "../constants/messages.js";

export class InvalidCredentials extends Error {
  constructor(
    message = msg.login.INVALID_CREDENTIALS,
    statusCode = StatusCodes.FORBIDDEN
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}
