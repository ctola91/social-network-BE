const User = require('../models').User;

const getUsers = async (from = 0, limit = 5, filters) => {
    const data = await User.findAndCountAll({ limit, offset: from, where: filters, attributes: ['id', 'firstName', 'email', 'role', 'state']})
    return data;
}

module.exports = {
    getUsers
}