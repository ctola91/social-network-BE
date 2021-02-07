const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SEED, TIME_TOKEN } = require("../config/config");

const getToken = (user) => {
  return jwt.sign({ user }, SEED, { expiresIn: TIME_TOKEN });
};

const isValidPassword = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword);
};

const validateToken = (token) => {
  try {
    let decoded = jwt.verify(token, SEED);
    return { decoded, err: null };
  } catch (e) {
    console.log(e);
    return { decoded: null, err: e };
  }
};

const isAdmin = (user) => {
  return user.role === "ADMIN_ROLE";
};

module.exports = {
  getToken,
  isValidPassword,
  validateToken,
  isAdmin,
};
