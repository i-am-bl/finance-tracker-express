import { StatusCodes } from "http-status-codes";

import { TransactionCreator } from "../services/transactions/transactionCreator.js";
import { TransactionReader } from "../services/transactions/transactionReader.js";
import { TransactionUpdater } from "../services/transactions/transactionUpdater.js";
import { TransactionDeleter } from "../services/transactions/transactionDeleter.js";
import { responsePayload, validateSchema } from "../utilities/utils.js";
import { withErrorHandler } from "../middleware/withErrorHandler.js";
import msg from "../constants/messages.js";
import { transactionSchema } from "../schemas/index.js";

export const getTransactions = withErrorHandler(async (req, res) => {
  const { accountId, page, limit } = req.params;

  const transactions = await TransactionReader.getPaginatedTransactions({
    accountId: accountId,
    page: page,
    limit: limit,
  });

  responsePayload({
    res: res,
    statusCode: StatusCodes.OK,
    message: msg.success.SUCCESS,
    data: transactions,
  });
});

export const getTransaction = withErrorHandler(async (req, res) => {
  const { transactionId } = req.params;
  const transaction = await TransactionReader.getTransaction(transactionId);

  responsePayload({
    res: res,
    statusCode: StatusCodes.OK,
    message: msg.success.SUCCESS,
    data: validateSchema({
      data: transaction.dataValues,
      schema: transactionSchema.transactionResp,
    }),
  });
});

export const createTransaction = withErrorHandler(async (req, res) => {
  const { transactionData } = req.body;
  validateSchema({
    data: transactionData,
    schema: transactionSchema.createTransaction,
  });
  const transaction = await TransactionCreator.createTransaction(
    transactionData
  );

  responsePayload({
    res: res,
    statusCode: StatusCodes.CREATED,
    message: msg.success.RECORD_CREATED,
    data: validateSchema({
      data: transaction.dataValues,
      schema: transactionSchema.transactionResp,
    }),
  });
});

export const updateTransaction = withErrorHandler(async (req, res) => {
  const { transactionId } = req.params;
  const { transactionData } = req.body;
  validateSchema({
    data: transactionData,
    schema: transactionSchema.updateTransaction,
  });
  const transaction = await TransactionUpdater.updateTransaction(
    transactionId,
    transactionData
  );

  responsePayload({
    res: res,
    statusCode: StatusCodes.OK,
    message: msg.success.RECORD_UPDATED,
    data: validateSchema({
      data: transaction.dataValues,
      schema: transactionSchema.transactionResp,
    }),
  });
});

export const softDelTransaction = withErrorHandler(async (req, res) => {
  const { transactionId } = req.params;
  const transaction = await TransactionDeleter.softDelTransaction(
    transactionId
  );

  responsePayload({
    res: res,
    statusCode: StatusCodes.OK,
    message: msg.success.RECORD_DELETED,
    data: validateSchema({
      data: transaction.dataValues,
      schema: transactionSchema.transactionDelResp,
    }),
  });
});
