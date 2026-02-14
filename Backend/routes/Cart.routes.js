import express from "express";
import authUser from "../middlewares/authUser.js";   // ✅ default import
import { updateCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/update", authUser, updateCart);  // ✅ middleware + controller

export default router;
