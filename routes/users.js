const express = require('express');

const { getUsers, addUser } = require('../services/UserService');
const app = express();

app.get('/users', async (req, res) => {
    try {
        let from = req.query.from || 0;
        from = Number(from);
        let limit = req.query.limit || 5;
        limit = Number(limit);
        const attributes = ['id', 'firstName', 'email', 'role', 'state'];
        const { count, rows } = await getUsers(from, limit, null, attributes);
        return res.json({
            users: rows,
            count
        })
    } catch (error) {
        console.log(error);
    }
});

// app.get('/users/:userId', (req, res) => getUserById(req, res));
app.post('/users', async (req, res) => {
    try {
        let body = req.body;
        const user = await addUser(body);
        return res.status(201).json(user);
    } catch (e) {
        console.log(e);
    }
});
// app.put('/users/:userId', (req, res) => updateUser(req, res));
// app.delete('/users/:userId', (req, res) => deleteUser(req, res));

module.exports = app;