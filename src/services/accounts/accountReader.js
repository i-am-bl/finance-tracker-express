import Account from "../../models/Account.js";
import { accountSchema } from "../../schemas/index.js";
import { paginationOffset, validateSchema } from "../../utilities/utils.js";
export class AccountReader {
  static async getUserAcct(id) {
    return await Account.findByPk(id);
  }
  static async getUserAccts({ page = 1, limit = 10 }) {
    const offset = paginationOffset({
      page: page,
      limit: limit,
    });

    const result = await Account.findAndCountAll({
      limit: limit,
      offset: offset,
    });
    const totalCount = result.count;
    const hasMore = totalCount > page * limit;
    const accounts = result.rows.map((account) => account.dataValues);
    return {
      totalCount: totalCount,
      currentPage: page,
      limit: limit,
      hasMore: hasMore,
      data: validateSchema({
        data: accounts,
        schema: accountSchema.accountRespArray,
      }),
    };
  }
}
