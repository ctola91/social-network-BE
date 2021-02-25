const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} = require("../services/CommentService");
/**
 * @swagger
 *  components:
 *      schemas:
 *            Comment:
 *               type: object
 *               required:
 *                   - postId
 *                   - text
 *                   - author
 *               properties:
 *                   _id:
 *                       type: number
 *                       description: The auto-generated id of the user.
 *                   postId:
 *                       type: number
 *                       description: id of Post.
 *                   text:
 *                       type: string
 *                       description: text of comment.
 *                   author:
 *                       type: number
 *                       description: id of user that create the comment
 *               example:
 *                   postId: 1
 *                   text: Lorem Ipsum
 *                   author: 1234
 */
const app = express();
/**
 * @swagger
 *
 * /posts/{postId}/comments:
 *      get:
 *          tags:
 *              - Comments
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: postId
 *                type: number
 *          responses:
 *              '200':
 *                  description: a list of comments from one post
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Comment'
 */
app.get("/posts/:postId/comments", async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await getComments(postId);
    return res.json(comments);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
});
/**
 * @swagger
 *
 * /posts/{postId}/comments:
 *      post:
 *          tags:
 *              - Comments
 *          produces:
 *              - application/json
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comment'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '201':
 *                  description: Comment created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Comment'
 *              '401':
 *                  description: Token is invalid
 */
app.post("/posts/:postId/comments", [verifyToken], async (req, res) => {
  try {
    const postId = req.params.postId;
    const body = req.body;
    const comment = await addComment({ postId, ...body });
    return res.status(201).json(comment);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
});
/**
 * @swagger
 *
 * /posts/{postId}/comments/{commentId}:
 *      put:
 *          tags:
 *              - Comments
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: commentId
 *                type: number
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comment'
 *          responses:
 *              '200':
 *                  description: comment updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Comment'
 *              '401':
 *                  description: Token is invalid
 */
app.put(
  "/posts/:postId/comments/:commentId",
  [verifyToken],
  async (req, res) => {
    try {
      let commentId = req.params.commentId;
      let body = _.pick(req.body, ["text"]);
      const comment = await updateComment({ commentId, ...body });
      return res.json(comment);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  }
);
/**
 * @swagger
 *
 * /posts/{postId}/comments/{commentId}:
 *      delete:
 *          tags:
 *              - Comments
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: commentId
 *                type: number
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '200':
 *                  description: comment deleted
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Comment'
 *              '401':
 *                  description: Token is invalid
 */
app.delete(
  "/posts/:postId/comments/:commentId",
  [verifyToken],
  async (req, res) => {
    try {
      let commentId = req.params.commentId;
      const commentDeleted = await deleteComment(commentId);
      return res.json({ pos: commentDeleted });
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
);

module.exports = app;
