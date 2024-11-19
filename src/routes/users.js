import express from "express";

import routers from "../constants/routers.js";
import {
  getUser,
  createUser,
  updateUser,
  softDelUser,
} from "../controllers/users.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

const userId = routers.v1.users.userId;
const userDefault = routers.v1.users.userDefault;

router.use(userId, validateJWT);

router.get(userId, getUser);
router.put(userId, updateUser);
// router.delete(userId, softDelUser);

export default router;
