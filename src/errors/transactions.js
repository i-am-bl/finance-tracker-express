import { StatusCodes } from "http-status-codes";
import msg from "../constants/messages.js";

export class TransactionNotExist extends Error {
  constructor(
    message = msg.transactions.TRANSACTION_NOT_EXIST,
    statusCode = StatusCodes.BAD_REQUEST
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}
