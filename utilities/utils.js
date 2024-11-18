import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { InvalidCredentials } from "../errors/login.js";
import { UserUnauthorized } from "../errors/users.js";
import { InvalidSchema } from "../errors/schemaValidation.js";

config();

/**
 * Utility function creating a standard response pattern.
 * @param {res} //response object
 * @param { statusCode} // http status code
 * @param {message} // message to be sent to user in response object.
 * @param { data} // data to be sent in response object.
 *  */
export function responsePayload({
  res,
  statusCode,
  message = null,
  data = null,
}) {
  // no data
  if (data === null && message !== null) {
    res.status(statusCode).json({
      message: message,
    });
    // no message
  } else if (data !== null && message === null) {
    res.status(statusCode).json({
      data: data,
    });
  }
  // standaard response pattern
  else
    res.status(statusCode).json({
      message: message,
      data: data,
    });
}

export function paginationOffset({ page, limit }) {
  const parsedPageInt = parseInt(page, 10);
  const parsedLimitInt = parseInt(limit, 10);
  return (parsedPageInt - 1) * parsedLimitInt;
}

export async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) {
    throw new InvalidCredentials();
  }
}

export function createJWT({ userId }) {
  const secretKey = process.env.JWT_SECRET_KEY;
  const expiresIn = process.env.JWT_EXPIRATION || "15m";
  const payload = { sub: userId };
  const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });
  return token;
}

/**
 * Utility function for setting the JWT as a cookie.
 * @param {res} //response
 * @param {token} // JWT token
 */
export function setJWTCookie({ res, token }) {
  res.cookie("token", token, {
    httpOnly: true,
    // https only if production, http if development
    secure: process.env.ENV === "production",
    maxAge: 900000,
    sameSite: "strict",
  });
}

export function issueJWT({ res, userId }) {
  setJWTCookie({ res: res, token: createJWT({ userId: userId }) });
}

/**
 * Utility function for the data validation layer.
 * @param {data} //data to be validated
 * @param {schema} //schema for data validation
 */
export function validateSchema({ data, schema }) {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (error) {
    throw new InvalidSchema({ details: error.details });
  }
  return value;
}
