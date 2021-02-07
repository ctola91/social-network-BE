const express = require("express");

const { getUserByEmail } = require("../services/UserService");
const { getToken, isValidPassword } = require("../services/AuthService");

/**
 * @swagger
 *  components:
 *      schemas:
 *            LoginForm:
 *               type: object
 *               properties:
 *                   email:
 *                       type: string
 *                       description: Email of user
 *                   password:
 *                       type: string
 *                       description: password of user
 *               example:
 *                   email: admin@gmail.com
 *                   password: your_strong_password
 *            LoginResult:
 *               type: object
 *               properties:
 *                   user:
 *                       type: object
 *                       schema: 
 *                          $ref: '#/components/schemas/User'
 *                   token:
 *                       type: string
 *                       description: token of login
 */
const app = express();
/**
 * @swagger
 *
 * /login:
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
 *                          $ref: '#/components/schemas/LoginForm'
 *          responses:
 *              '200':
 *                  description: User Logged
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/LoginResult'
 *              '401':
 *                  description: User is not authorized
 */
app.post("/login", async (req, res) => {
  try {
    let body = req.body;
    const user = await getUserByEmail(body.email);
    if (!user) {
      return res.status(401).json({
        message: "User or password incorrect",
      });
    }
    if (!isValidPassword(body.password, user.password)) {
      return res.status(401).json({
        message: "User or password incorrect",
      });
    }
    const token = getToken(user);
    res.json({
      user,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
});

module.exports = app;
