import { TransactionNotExist } from "../../errors/transactions.js";
import Transaction from "../../models/Transaction.js";

export class TransactionDeleter {
  static async softDelTransaction(id) {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      throw new TransactionNotExist();
    }
    return await transaction.destroy();
  }
}
