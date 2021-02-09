const express = require("express");

const app = express();

app.use(require("./users"));
app.use(require("./posts"));
app.use(require('./comments'));
app.use(require("./login"));

module.exports = app;
