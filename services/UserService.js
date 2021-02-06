const UserRepository = require('../repository/UserRepository');

const getUsers = async (from = 0, limit = 5, filters, attributes) => {
    let defaultFilters = {
        state: true
    };

    if(!filters) {
        filters = defaultFilters;
    }

    const data = await UserRepository.getUsers(from, limit, filters, attributes);
    return data;
}

const getUserById = async (id) => {
    const user = await UserRepository.getUserById(id);
    return user;
}

const addUser = async ({firstName, lastName, email, password, img, role, state}) => {
    const user = await UserRepository.addUser({firstName, lastName, email, password, img, role, state});
    return user
}

module.exports = {
    getUsers,
    getUserById,
    addUser
}