import { AccountNotCreated } from "../../errors/accounts.js";
import Account from "../../models/Account.js";

export class AccountCreator {
  static async createUserAcct(accountData) {
    const account = await Account.create(accountData);
    if (!account) {
      throw new AccountNotCreated();
    }
    return account;
  }
}
