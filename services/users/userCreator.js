import { InvalidCredentials } from "../../errors/login.js";
import User from "../../models/User.js";
import { hashPassword } from "../../utilities/utils.js";

export class UserCreator {
  static async createUser(userData) {
    const hashedPassword = await hashPassword(userData.password);
    userData.password = hashedPassword;
    const user = await User.create(userData);
    if (!user) {
      throw new InvalidCredentials();
    }
    return user;
  }
}
