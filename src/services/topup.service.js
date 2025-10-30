import { Topup } from "../models/topup.js";

export const createTopup = async (userId, amount) => {
  await Topup.create(userId, amount);
};
