const bcrypt = require("bcrypt");
const UserRepository = require("../repository/UserRepository");

const getUsers = async (from = 0, limit = 5, filters, attributes) => {
  let defaultFilters = {
    state: true,
  };

  if (!filters) {
    filters = defaultFilters;
  }

  const data = await UserRepository.getUsers(from, limit, filters, attributes);
  return data;
};

const getUserById = async (id) => {
  const user = await UserRepository.getUserById(id);
  return user;
};

const getUserByEmail = async (email) => {
  const user = await UserRepository.getUserByEmail(email);
  return user;
};

const addUser = async ({
  firstName,
  lastName,
  email,
  password,
  img,
  role,
  state,
}) => {
  const user = await UserRepository.addUser({
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, 10),
    img,
    role,
    state,
  });
  return user;
};

const updateUser = async ({
  userId,
  firstName,
  lastName,
  email,
  img,
  role,
  state,
}) => {
  const user = await UserRepository.updateUser(
    userId,
    firstName,
    lastName,
    email,
    role,
    state,
    img
  );
  return user;
};

const deleteUser = async (id) => {
  const user = UserRepository.deleteUser(id);
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
