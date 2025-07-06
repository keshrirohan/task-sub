import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import submission from "./routes/submission.js";
import allDetail from "./routes/allDetail.js";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/", submission);

app.use("/daata", allDetail);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("running on ", PORT);
});
