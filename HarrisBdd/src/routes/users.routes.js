import express from "express";
import { login, getUserByLogin } from "../controllers/userscontrollers.js";
import { Router } from "express";
import { auth } from "../Middleware/auth.js";

const router = Router();

router.post("/login", login);
router.get("/:etna_id", getUserByLogin);

// router.get("/:id/company", usersControllers.companyByUser)

export default router;
