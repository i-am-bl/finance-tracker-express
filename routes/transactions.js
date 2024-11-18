import express from "express";
import {
  getTransaction,
  getTransactions,
  createTransaction,
  updateTransaction,
  softDelTransaction,
} from "../controllers/transactions.js";
import routers from "../constants/routers.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

const transactionId = routers.v1.users.accounts.transactions.transactionId;
const transactionDefault =
  routers.v1.users.accounts.transactions.transactionDefault;

router.use(transactionId, validateJWT);
router.use(transactionDefault, validateJWT);

router.get(transactionId, getTransaction);
router.get(transactionDefault, getTransactions);
router.post(transactionDefault, createTransaction);
router.put(transactionId, updateTransaction);
router.delete(transactionId, softDelTransaction);

export default router;
