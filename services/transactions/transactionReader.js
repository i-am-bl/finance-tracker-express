import Transaction from "../../models/Transaction.js";
import { paginationOffset, validateSchema } from "../../utilities/utils.js";
import { TransactionNotExist } from "../../errors/transactions.js";
import { transactionSchema } from "../../schemas/index.js";

export class TransactionReader {
  static async getTransaction(id) {
    const transaction = Transaction.findByPk(id);
    if (!transaction) {
      throw new TransactionNotExist();
    }
    return transaction;
  }

  static async getPaginatedTransactions({ accountId, page = 1, limit = 10 }) {
    const offset = paginationOffset({ page: page, limit: limit });

    const result = await Transaction.findAndCountAll({
      where: { accountId },
      limit: limit,
      offset: offset,
      order: [
        ["postingDate", "desc"],
        ["name", "desc"],
      ],
    });

    const totalCount = result.count;
    const totalPages = Math.ceil(totalCount / limit);
    const hasMore = totalCount > page * limit;

    if (totalCount < 1) {
      throw new TransactionNotExist();
    }
    const transactions = result.rows.map(
      (transaction) => transaction.dataValues
    );

    return {
      totalCount: totalCount,
      totalPages: totalPages,
      currentPage: page,
      limit: limit,
      hasMore: hasMore,
      data: validateSchema({
        data: transactions,
        schema: transactionSchema.transactionArrayResp,
      }),
    };
  }
}
