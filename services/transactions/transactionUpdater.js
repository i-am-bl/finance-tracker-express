import Transaction from "../../models/Transaction.js";
import { TransactionNotExist } from "../../errors/transactions.js";

export class TransactionUpdater {
  static async updateTransaction(id, accountData) {
    await Transaction.update(accountData, {
      where: { id },
    });

    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      throw new TransactionNotExist();
    }
    return transaction;
  }
}
