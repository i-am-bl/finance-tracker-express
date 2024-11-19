import Joi from "joi";

export const createAccount = Joi.object({
  userId: Joi.number().required(),
  name: Joi.string().trim().required(),
  no: Joi.string().trim(),
  startOn: Joi.date(),
  endOn: Joi.date(),
});
export const updateAccount = Joi.object({
  name: Joi.string().strip(),
  no: Joi.string().strip(),
  startOn: Joi.date(),
  endOn: Joi.date(),
});
export const accountResp = Joi.object({
  id: Joi.number(),
  userId: Joi.number(),
  name: Joi.string(),
  no: Joi.string().allow(null).optional(),
  startOn: Joi.date().allow(null).optional(),
  endOn: Joi.date().allow(null).optional(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  deletedAt: Joi.date().allow(null).optional().strip(),
});
export const accountRespArray = Joi.array().items(accountResp);
export const accountDelResp = Joi.object({
  id: Joi.number(),
  userId: Joi.number(),
  name: Joi.string(),
  no: Joi.string().allow(null).optional(),
  startOn: Joi.date().allow(null).optional(),
  endOn: Joi.date().allow(null).optional(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  deletedAt: Joi.date(),
});
