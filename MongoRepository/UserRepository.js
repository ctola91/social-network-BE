const mongoose = require('mongoose');

const User = require("../models/user.doc");

const getUsers = async (from = 0, limit = 5, filters, attributes) => {
    const rows = await User.find(filters, attributes)
        .skip(from)
        .limit(limit)
        .exec();
    const count = await User.find(filters).count();
    return { count, rows };
};

const getUserById = async (id) => {
    const user = await User.findOne({ _id: id });
    return user;
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user
}

const addUser = async ({
    firstName,
    lastName,
    email,
    password,
    img,
    role,
    state,
}) => {
    const user = new User({
        firstName,
        lastName,
        email,
        password,
        img,
        role,
        state,
    });
    return await user.save();
};

const updateUser = async ({
    userId,
    firstName,
    lastName,
    email,
    role,
    state,
    img,
}) => {
    const user = await User.findByIdAndUpdate(userId, { firstName, lastName, email, role, img, state }, { new: true, runValidators: true });
    return user;
};

const deleteUser = async (id) => {
    const deleteState = {
        state: false,
    };
    const user = await User.findByIdAndUpdate(id, deleteState);
    return user;
};

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser,
};
