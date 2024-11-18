import { InvalidCredentials } from "../../errors/login.js";
import User from "../../models/User.js";

export class UserReader {
  static async getUser(id) {
    return await User.findByPk(id);
  }
  static async getUserByUsername(username) {
    const user = await User.findOne({
      where: { username: username },
    });
    if (!user) {
      throw new InvalidCredentials();
    }
    return user;
  }
}
