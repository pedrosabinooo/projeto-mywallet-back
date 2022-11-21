import dayjs from "dayjs";

import db from "../db.js";

import { transactionSchema } from "../schemas/transactionSchema.js";

export async function getTransactions(req, res) {
  const { user } = res.locals;
  try {
    const transactions = await db
      .collection("transactions")
      .find({ userId: user._id })
      .toArray();
    res.send(transactions);
  } catch (error) {
    console.log("Error getting all financial transactions.");
    console.log(error);
    res.sendStatus(500);
    return;
  }
}

export async function addTransaction(req, res) {
  const { error } = transactionSchema.validate(req.body);
  if (error) {
    res.status(422).send(error.details.map((detail) => detail.message)); // unprocessable entity
    return;
  }
  const { user } = res.locals;
  try {
    const { type, description, value } = req.body;
    await db.collection("transactions").insertOne({
      type,
      value,
      description,
      date: dayjs().format("DD/MM"),
      userId: user._id,
    });
    res.sendStatus(201);
  } catch (error) {
    console.log("Error adding new transaction.");
    console.log(error);
    res.sendStatus(500);
    return;
  }
}
