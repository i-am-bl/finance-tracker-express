const def = "/";
const api = "/api";

const v1 = "/v1";

const login = "/login";
const signup = "/signup";

const userBase = "/users";
const userId = "/:userId";

const accountBase = "/accounts";
const accountId = "/:accountId";

const transactionBase = "/transactions";
const transactionId = "/:transactionId";

export default {
  v1: {
    def: `${api}${v1}`,
    login: `${login}`,
    signup: `${signup}`,
    users: {
      userDefault: `${userBase}${def}`,
      userId: `${userBase}${userId}`,
      accounts: {
        accountDefault: `${userBase}${userId}${accountBase}${def}`,
        accountId: `${userBase}${userId}${accountBase}${accountId}`,
        transactions: {
          transactionDefault: `${userBase}${userId}${accountBase}${accountId}${transactionBase}${def}`,
          transactionId: `${userBase}${userId}${accountBase}${accountId}${transactionBase}${transactionId}`,
        },
      },
    },
  },
};
