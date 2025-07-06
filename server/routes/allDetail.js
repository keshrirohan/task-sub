import express from "express";
import dataExtract from "../controllers/dataExtract.js";
const router = express.Router();

router.get("/", dataExtract);
export default router;
