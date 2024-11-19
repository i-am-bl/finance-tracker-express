import { StatusCodes } from "http-status-codes";
import msg from "../constants/messages.js";
export class AccountNotExist extends Error {
  constructor(
    message = msg.accounts.ACCOUNT_NOT_EXIST,
    statusCode = StatusCodes.BAD_REQUEST
  ) {
    super(message),
      (this.message = message),
      (this.statusCode = statusCode),
      (this.name = this.constructor.name);
  }
}

export class AccountNotCreated extends Error {
  constructor(
    message = msg.accounts.ACCOUNT_NOT_CREATED,
    statusCode = StatusCodes.BAD_REQUEST
  ) {
    super(message),
      (this.message = message),
      (this.statusCode = statusCode),
      (this.name = this.constructor.name);
  }
}
