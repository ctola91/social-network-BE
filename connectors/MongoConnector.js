const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_URL,
} = require("../config/config");

let db;

if (!MONGO_USER && !MONGO_PASSWORD && !((MONGO_USER === MONGO_PASSWORD) === "")) {
  db = mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} else {
  db = mongoose.connect(MONGO_URL, {
    user: MONGO_USER,
    pass: MONGO_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = db;
