import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "./../db.js";

export async function signUp(req, res) {
  try {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(req.body.password, SALT);
    
    await db.collection("users").insertOne({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash
    });

    return res.sendStatus(201); // created
  } catch (error) {
    console.log("Error creating new user.");
    console.log(error);
    return res.sendStatus(500);
  }

}

export async function signIn(req, res) {
  try {
    const user = await db.collection("users").findOne({email: req.body.email});
    if(!user) return res.sendStatus(404);

    if(user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({token, userId: user._id});
      return res.send({token, name: user.name});
    }

    return res.sendStatus(404); // not found
  } catch (error) {
    console.log("Error recovering user.");
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function signOut(req, res) {
  const {authorization} = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  if(!token) return res.send(403); // forbidden
  
  try {
    await db.collection("sessions").deleteOne({token});
    res.sendStatus(200);
  } catch (error) {
    console.log("Error logging out.");
    console.log(error);
    return res.sendStatus(500);
  }
}