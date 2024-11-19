import express from "express";
import { validateUser } from "../controllers/users.js";
import routers from "../constants/routers.js";

const router = express.Router();
const login = routers.v1.login;

router.post(login, validateUser);

export default router;
