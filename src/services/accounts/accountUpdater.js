import { AccountNotExist } from "../../errors/accounts.js";
import Account from "../../models/Account.js";
export class AccountUpdater {
  static async updateUserAcct(id, accountData) {
    await Account.update(accountData, {
      where: { id },
    });
    const account = await Account.findByPk(id);
    if (!account) {
      throw new AccountNotExist();
    }

    return account;
  }
}
