import express from "express";
import {
  getAccount,
  getAccounts,
  createAccount,
  updateAccount,
  softDelAccount,
} from "../controllers/accounts.js";
import routers from "../constants/routers.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

const accountId = routers.v1.users.accounts.accountId;
const accountDefault = routers.v1.users.accounts.accountDefault;

router.use(accountId, validateJWT);
router.use(accountDefault, validateJWT);

router.get(accountId, getAccount);
router.get(accountDefault, getAccounts);
router.post(accountDefault, createAccount);
router.put(accountId, updateAccount);
router.delete(accountId, softDelAccount);

export default router;
