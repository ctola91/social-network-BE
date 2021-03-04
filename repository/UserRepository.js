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
  });
  return user;
};

const updateUser = async ({
  userId,
  firstName,
  lastName,
  email,
  role,
  img,
}) => {
  // const user = await User.update(
  //   { firstName, lastName, email, role, state, img },
  //   { where: { id: userId } }
  // );
  // return user;
  const currentUser = await User.findOne({ where: { id: userId }});
  currentUser.firstName = firstName || currentUser.firstName,
  currentUser.lastName = lastName  || currentUser.lastName,
  currentUser.email = email || currentUser.email,
  currentUser.role = role  || currentUser.role,
  currentUser.img = img || currentUser.img;
  const user = await currentUser.save();
  return user;
};

const deleteUser = async (id) => {
  const deleteState = {
    state: false,
  };
  // const user = await User.update(deleteState, { where: { id } });
  const currentUser = await User.findOne({ where: { id }});
  currentUser.state = deleteState.state;
  const user = await currentUser.save();
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
