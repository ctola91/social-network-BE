const User = require('../models').User;

const getUsers = async (from = 0, limit = 5, filters, attributes) => {
    const data = await User.findAndCountAll({ limit, offset: from, where: filters, attributes})
    return data;
}

const addUser = async ({firstName, lastName, email, password, img, role, state}) => {
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        img,
        role,
        state
    });
    return user;
}

module.exports = {
    getUsers,
    addUser
}