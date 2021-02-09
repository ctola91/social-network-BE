const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} = require("../services/CommentService");

const app = express();

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
