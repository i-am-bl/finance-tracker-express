import { InvalidCredentials } from "../../errors/login.js";
import User from "../../models/User.js";

export class UserUpdater {
  static async updateUser(id, userData) {
    await User.update(userData, {
      where: { id: id },
    });
    const user = await User.findByPk(id);
    if (!user) {
      throw new InvalidCredentials();
    }

    return user;
  }
}
