const express = require('express');

const app = express();

app.get('/users', (req, res) => getUsers(req, res));
app.get('/users/:userId', (req, res) => getUserById(req, res));
app.post('/users', (req, res) => addUser(req, res));
app.put('/users/:userId', (req, res) => updateUser(req, res));
app.delete('/users/:userId', (req, res) => deleteUser(req, res));

module.exports = app;