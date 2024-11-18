import Joi from "joi";

export const createUser = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  username: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().required().trim(),
});

export const updateUser = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  username: Joi.string().trim(),
  email: Joi.string().email().trim(),
  password: Joi.string().trim(),
});

export const userResp = Joi.object({
  id: Joi.number(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  username: Joi.string(),
  email: Joi.string(),
  password: Joi.string().strip(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  deletedAt: Joi.date().allow(null).optional().strip(),
});

export const userDelResp = Joi.object({
  id: Joi.number(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  username: Joi.string(),
  email: Joi.string(),
  password: Joi.string().strip(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  deletedAt: Joi.date(),
});

export const userLogin = Joi.object({
  username: Joi.string().required().trim(),
  password: Joi.string().required().trim(),
});
