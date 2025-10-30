import { User } from "../../models/user.js";

export const findUserByEmail = async (email) => {
    return await User.findByEmail(email);
};

export const updateUserData = async (userId, data) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    const updatedData = { ...user, ...data };

    await User.updateDataUser(userId, updatedData.first_name || user.first_name, updatedData.last_name || user.last_name);
    return await User.findById(userId);
}

export const updateProfileImage = async (userId, filePath) => {
    await User.updateProfileImage(userId, filePath);
    const user = await User.findById(userId);
    return user;
};

export const incrementBalance = async (userId, amount) => {
    await User.incrementBalance(userId, amount);
}

export const decrementBalance = async (userId, amount) => {
    await User.decrementBalance(userId, amount);
}

export const getBalance = async (userId) => {
    const balance = await User.getBalance(userId);
    return balance;
};