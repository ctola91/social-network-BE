const User = require("../models").User;

const getUsers = async (from = 0, limit = 5, filters, attributes) => {
  const data = await User.findAndCountAll({
    limit,
    offset: from,
    where: filters,
    attributes,
  });
  return data;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email }});
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
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
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
  role,
  state,
  img,
}) => {
  const user = await User.update(
    { firstName, lastName, email, role, state, img },
    { where: { id: userId } }
  );
  return user;
};

const deleteUser = async (id) => {
  const deleteState = {
    state: false,
  };
  const user = await User.update(deleteState, { where: { id } });
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
