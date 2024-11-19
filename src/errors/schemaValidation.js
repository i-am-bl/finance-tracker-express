import { StatusCodes } from "http-status-codes";
import msg from "../constants/messages.js";

export class InvalidSchema extends Error {
  constructor({
    message = msg.error.INVALID_SCHEMA,
    statusCode = StatusCodes.BAD_REQUEST,
    details = null,
  }) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = this.constructor.name;
  }
}
