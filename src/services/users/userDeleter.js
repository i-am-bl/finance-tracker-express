import User from "../../models/User.js";

export class UserDeleter {
  static async softDelUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      return;
    }
    await user.destroy();
    return user;
  }
}
