import express from "express";
import { createUser } from "../controllers/users.js";
import routers from "../constants/routers.js";

const router = express.Router();

const signup = routers.v1.signup;

router.post(signup, createUser);

export default router;
