import express from "express";
import cors from "cors";
import userRouter from "./routes/authRouter.js";
import transactionsRouter from "./routes/transactionsRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(transactionsRouter);
