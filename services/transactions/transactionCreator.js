import Transaction from "../../models/Transaction.js";

export class TransactionCreator {
  static async createTransaction(transactionData) {
    return await Transaction.create(transactionData);
  }
}
