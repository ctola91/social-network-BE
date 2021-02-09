const CommentRepository = require("../repository/CommentRepository");

const getComments = async (postId) => {
  const comments = await CommentRepository.getComments(postId);
  return comments;
};

const addComment = async ({ postId, text, author }) => {
  return await CommentRepository.addComment({ postId, text, author });
};

const updateComment = async ({ commentId, text }) => {
  return await CommentRepository.updateComment({ commentId, text });
};

const deleteComment = async (commentId) => {
  return await CommentRepository.deleteComment(commentId);
};

module.exports = {
  getComments,
  addComment,
  updateComment,
  deleteComment,
};
