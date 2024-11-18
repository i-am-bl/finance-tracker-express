import { StatusCodes } from "http-status-codes";

import { withErrorHandler } from "../middleware/withErrorHandler.js";
import msg from "../constants/messages.js";
import { UserCreator } from "../services/users/userCreator.js";
import { UserReader } from "../services/users/userReader.js";
import { UserDeleter } from "../services/users/userDeleter.js";
import { UserUpdater } from "../services/users/userUpdater.js";
import {
  hashPassword,
  issueJWT,
  responsePayload,
  validateSchema,
  verifyPassword,
} from "../utilities/utils.js";
import { userSchema } from "../schemas/index.js";

export const getUser = withErrorHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await UserReader.getUser(userId);
  responsePayload({
    res: res,
    statusCode: StatusCodes.OK,
    message: msg.success.SUCCESS,
    data: validateSchema({ data: user, schema: userSchema.userResp }),
  });
});

export const createUser = withErrorHandler(async (req, res) => {
  const { userData } = req.body;
  validateSchema({
    data: userData,
    schema: userSchema.createUser,
  });
  const user = await UserCreator.createUser(userData);
  responsePayload({
    res: res,
    statusCode: StatusCodes.CREATED,
    message: msg.success.RECORD_CREATED,
    data: validateSchema({ data: user, schema: userSchema.userResp }),
  });
});

export const updateUser = withErrorHandler(async (req, res) => {
  const { userId } = req.params;
  const { userData } = req.body;
  validateSchema({ data: userData, schema: userSchema.updateUser });

  if (userData.password) {
    const hashedPassword = await hashPassword(userData.password);
    userData.password = hashedPassword;
  }

  const user = await UserUpdater.updateUser(userId, userData);

  responsePayload({
    res: res,
    statusCode: StatusCodes.OK,
    message: msg.success.RECORD_UPDATED,
    data: validateSchema({ data: user, schema: userSchema.userResp }),
  });
});

export const softDelUser = withErrorHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await UserDeleter.softDelUser(userId);
  responsePayload({
    res: res,
    statusCode: StatusCodes.OK,
    message: msg.success.RECORD_DELETED,
    data: validateSchema({ data: user, schema: userSchema.userDelResp }),
  });
});

export const validateUser = withErrorHandler(async (req, res) => {
  const { userData } = req.body;
  validateSchema({ data: userData, schema: userSchema.userLogin });
  const user = await UserReader.getUserByUsername(userData.username);
  await verifyPassword(userData.password, user.password);
  issueJWT({ res: res, userId: user.id });
  responsePayload({
    res: res,
    statusCode: StatusCodes.OK,
    message: msg.login.SUCCESSFULLY_LOGGED_IN,
  });
});
