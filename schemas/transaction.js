import Joi from "joi";

export const createTransaction = Joi.object({
  accountId: Joi.number().required(),
  name: Joi.string().trim().required(),
  type: Joi.string().valid("credit", "debit").required(),
  amount: Joi.number().precision(2).positive().required(),
  postingDate: Joi.date().required(),
});
export const updateTransaction = Joi.object({
  name: Joi.string(),
  type: Joi.string(),
  amount: Joi.number().precision(2).positive(),
  postingDate: Joi.date(),
});

export const transactionResp = Joi.object({
  id: Joi.number(),
  acountId: Joi.number(),
  name: Joi.string(),
  type: Joi.string(),
  amount: Joi.number().precision(2),
  postingDate: Joi.date(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  deletedAt: Joi.date().optional().allow(null).strip(),
});
export const transactionDelResp = Joi.object({
  id: Joi.number(),
  acountId: Joi.number(),
  name: Joi.string(),
  type: Joi.string(),
  amount: Joi.number(),
  postingDate: Joi.date(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  deletedAt: Joi.date().optional().allow(null),
});
export const transactionArrayResp = Joi.array().items(transactionResp);
