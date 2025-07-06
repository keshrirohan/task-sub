import express from "express";
import Gatherinfo from "../controllers/Gatherinfo.js";
import detailAuth from "../middleware/detailauthorise.js";
const router = express.Router();

router.post("/submit", detailAuth, Gatherinfo);

export default router;
