import { config } from "dotenv";
import jwt from "jsonwebtoken";

import { UserUnauthorized } from "../errors/users.js";
import { issueJWT } from "../utilities/utils.js";

config();

/*
 * Middleware for token validation.
 * If token is valid, a new token will be issued.
 */
export function validateJWT(req, res, next) {
  try {
    console.log("params: ", req.params);
    const { userId } = req.params;
    const token = req.cookies.token;

    const secretKey = process.env.JWT_SECRET_KEY;
    const decodedToken = jwt.verify(token, secretKey);

    const parsedUserId = parseInt(userId, 10);
    const parsedSub = parseInt(decodedToken.sub, 10);

    if (parsedUserId !== parsedSub) {
      throw new UserUnauthorized(); // User is ONLY authorized for their data.
    }
    issueJWT({ res: res, userId: userId });
    next();
  } catch (error) {
    throw new Error(error);
  }
}
