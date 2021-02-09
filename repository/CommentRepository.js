const Comments = require("../models/comment.doc");

const getComments = async (postId) => {
  const comments = await Comments.find({ postId });
  return comments;
};

const addComment = async ({ postId, text, author }) => {
  const comment = Comments.create({
    postId,
    text,
    author,
  });
  return comment;
};

const updateComment = async ({ commentId, text }) => {
  const comment = Comments.findByIdAndUpdate(
    commentId,
    { text },
    { new: true }
  );
  return comment;
};

const deleteComment = async (commentId) => {
  const comment = Comments.findByIdAndRemove(commentId);
  return comment;
};

module.exports = {
  getComments,
  addComment,
  updateComment,
  deleteComment,
};
