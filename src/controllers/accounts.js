import { StatusCodes } from "http-status-codes";
import { withErrorHandler } from "../middleware/withErrorHandler.js";
import { responsePayload, validateSchema } from "../utilities/utils.js";
import { AccountCreator } from "../services/accounts/accountCreator.js";
import { AccountDeleter } from "../services/accounts/accountDeleter.js";
import { AccountUpdater } from "../services/accounts/accountUpdater.js";
import { AccountReader } from "../services/accounts/accountReader.js";
import { accountSchema } from "../schemas/index.js";
import msg from "../constants/messages.js";

export const getAccount = withErrorHandler(async (req, res) => {
  const { accountId } = req.params;
  const account = await AccountReader.getUserAcct(accountId);

  responsePayload({
    res: res,
    statusCode: StatusCodes.OK,
    message: msg.success.SUCCESS,
    data: validateSchema({
      data: account.dataValues,
      schema: accountSchema.accountResp,
    }),
  });
});

export const getAccounts = withErrorHandler(async (req, res) => {
  const { page, limit } = req.params;
  const accounts = await AccountReader.getUserAccts({
    page: page,
    limit: limit,
  });
  responsePayload({
    res: res,
    statusCode: StatusCodes.OK,
    message: msg.success.SUCCESS,
    data: accounts,
  });
});

export const createAccount = withErrorHandler(async (req, res) => {
  const { accountData } = req.body;
  validateSchema({ data: accountData, schema: accountSchema.createAccount });
  const account = await AccountCreator.createUserAcct(accountData);

  responsePayload({
    res: res,
    statusCode: StatusCodes.CREATED,
    message: msg.success.RECORD_CREATED,
    data: validateSchema({
      data: account.dataValues,
      schema: accountSchema.accountResp,
    }),
  });
});

export const updateAccount = withErrorHandler(async (req, res) => {
  const { accountId } = req.params;
  const { accountData } = req.body;
  validateSchema({ data: accountData, schema: accountSchema.updateAccount });
  const account = await AccountUpdater.updateUserAcct(accountId, accountData);
  responsePayload({
    res: res,
    statusCode: StatusCodes.OK,
    message: msg.success.RECORD_UPDATED,
    data: validateSchema({
      data: account.dataValues,
      schema: accountSchema.accountResp,
    }),
  });
});

export const softDelAccount = withErrorHandler(async (req, res) => {
  const { accountId } = req.params;
  const account = await AccountDeleter.softDelUserAcct(accountId);
  responsePayload({
    res: res,
    statusCode: StatusCodes.OK,
    message: msg.success.RECORD_DELETED,
    data: validateSchema({
      data: account.dataValues,
      schema: accountSchema.accountDelResp,
    }),
  });
});
