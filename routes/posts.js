const express = require("express");
const _ = require("lodash");
const { verifyToken } = require("../middlewares/auth");

const {
  getPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
} = require("../services/PostService");
/**
 * @swagger
 *  components:
 *      schemas:
 *            Post:
 *               type: object
 *               required:
 *                   - description
 *                   - state
 *               properties:
 *                   id:
 *                       type: number
 *                       description: The auto-generated id of the user.
 *                   description:
 *                       type: string
 *                       description: firstName of user
 *                   tag:
 *                       type: string
 *                       description: LastName of user
 *                   image:
 *                       type: string
 *                       description: Email of user
 *                   state:
 *                       type: boolean
 *                       description: is available?
 *               example:
 *                   description: Lorem Ipsum
 *                   tag: blog
 *                   image: admin.jpg
 *                   state: true
 */
const app = express();
/**
 * @swagger
 *
 * /posts:
 *      get:
 *          tags:
 *              - Posts
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
 *                  description: a list of posts
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Post'
 *              '401':
 *                  description: Token is invalid
 */
app.get("/posts", async (req, res) => {
  try {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);
    const attributes = ["id", "description", "tag", "image", "state"];
    const { count, rows } = await getPosts(from, limit, null, attributes);
    return res.json({
      posts: rows,
      count,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
});
/**
 * @swagger
 *
 * /posts/{postId}:
 *      get:
 *          tags:
 *              - Posts
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: postId
 *                type: number
 *          responses:
 *              '200':
 *                  description: Post created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Post'
 *              '404':
 *                  description: Post not found
 *              '401':
 *                  description: Token is invalid
 */
app.get("/posts/:postId", async (req, res) => {
  try {
    let postId = req.params.postId;
    const post = await getPostById(postId);
    return res.json(post);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
});
/**
 * @swagger
 *
 * /posts:
 *      post:
 *          tags:
 *              - Posts
 *          produces:
 *              - application/json
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *          responses:
 *              '201':
 *                  description: post created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Post'
 */
app.post("/posts", async (req, res) => {
  try {
    let body = req.body;
    const post = await addPost(body);
    return res.status(201).json(post);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
});
/**
 * @swagger
 *
 * /posts/{postId}:
 *      put:
 *          tags:
 *              - Posts
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: postId
 *                type: number
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *          responses:
 *              '200':
 *                  description: post created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Post'
 *              '401':
 *                  description: Token is invalid
 */
app.put("/posts/:postId", [verifyToken], async (req, res) => {
  try {
    let postId = req.params.postId;
    let body = _.pick(req.body, ["description", "tag", "image", "state"]);
    const post = await updatePost({ postId, ...body });
    return res.json(post);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
});
/**
 * @swagger
 *
 * /posts/{postId}:
 *      delete:
 *          tags:
 *              - Posts
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: postId
 *                type: number
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '200':
 *                  description: post created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Post'
 *              '401':
 *                  description: Token is invalid
 */
app.delete("/posts/:postId", [verifyToken], async (req, res) => {
  try {
    let postId = req.params.postId;
    const postDeleted = await deletePost(postId);
    return res.json({ pos: postDeleted });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

module.exports = app;
