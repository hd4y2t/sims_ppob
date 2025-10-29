import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const registerUser = async (first_name, last_name, email, password) => {
  const hashed = await bcrypt.hash(password, 10);
  const userId = await User.create(first_name, last_name, email, hashed);
  return userId;
};

export const findUserByEmail = async (email) => {
  return await User.findByEmail(email);
};