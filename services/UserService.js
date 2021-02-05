const UserRepository = require('../repository/UserRepository');

const getUsers = async (from = 0, limit = 5, filters) => {
    let defaultFilters = {
        state: true
    };

    if(!filters) {
        filters = defaultFilters;
    }

    const data = await UserRepository.getUsers(from, limit, filters);
    return data;
}

module.exports = {
    getUsers
}