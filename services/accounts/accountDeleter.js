import { AccountNotExist } from "../../errors/accounts.js";
import Account from "../../models/Account.js";
export class AccountDeleter {
  static async softDelUserAcct(id) {
    const account = await Account.findByPk(id);
    if (!account) {
      throw new AccountNotExist();
    }
    await account.destroy();
    return account;
  }
}
