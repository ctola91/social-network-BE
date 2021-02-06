/**
 * @swagger
 *  components:
 *      schemas:
 *            User:
 *               type: object
 *               required:
 *                   - firstName
 *                   - lastName
 *                   - email
 *                   - password
 *                   - role
 *                   - state
 *               properties:
 *                   id:
 *                       type: number
 *                       description: The auto-generated id of the user.
 *                   firstName:
 *                       type: string
 *                       description: firstName of user
 *                   lastName:
 *                       type: string
 *                       description: LastName of user
 *                   email:
 *                       type: string
 *                       description: Email of user
 *                   password:
 *                       type: string
 *                       description: password of user
 *                   img:
 *                       type: string
 *                       description: image of user
 *                   role: 
 *                       type: string,
 *                       description: role of user
 *                   state:
 *                       type: boolean
 *                       description: is available?
 *               example:
 *                   firstName: Christian
 *                   lastName: Tola
 *                   email: admin@gmail.com
 *                   password: your_strong_password
 *                   img: image.jpg
 *                   role: ADMIN_ROLE
 *                   state: true
 */
const express = require('express');

const { getUsers, getUserById, addUser } = require('../services/UserService');
const app = express();
/**
 * @swagger
 * 
 * /users:
 *      get:
 *          tags:
 *              - Users
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: query
 *                name: from
 *                type: number
 *              - in: query
 *                name: limit
 *                type: number
 *          responses:
 *              '200':
 *                  description: a list of users
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/User'
 */
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
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e.message });
    }
});
/**
 * @swagger
 * 
 * /users/{userId}:
 *      get:
 *          tags:
 *              - Users
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: userId
 *                type: number
 *          responses:
 *              '200':
 *                  description: user
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object 
 *                              $ref: '#/components/schemas/User'
 *              '404':
 *                  description: User not found
 */
app.get('/users/:userId', async (req, res) => {
    try {
        let userId = req.params.userId;
        const user = await getUserById(userId);
        res.json(user);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ message: e.message });
    }
});
/**
 * @swagger
 * 
 * /users:
 *      post:
 *          tags:
 *              - Users
 *          produces:
 *              - application/json
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              '201':
 *                  description: user created
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User' 
 */
app.post('/users', async (req, res) => {
    try {
        let body = req.body;
        console.log(body);
        const user = await addUser(body);
        return res.status(201).json(user);
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e.message });
    }
});
// app.put('/users/:userId', (req, res) => updateUser(req, res));
// app.delete('/users/:userId', (req, res) => deleteUser(req, res));

module.exports = app;