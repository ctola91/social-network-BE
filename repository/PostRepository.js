const Post = require("../models").Post;

const getPosts = async (from = 0, limit = 5, filters, attributes) => {
  const data = await Post.findAndCountAll({
    limit,
    offset: from,
    where: filters,
    attributes,
  });
  return data;
};

const getPostById = async (id) => {
  const post = await Post.findOne({ where: { id } });
  return post;
};

const addPost = async ({ description, tag, state, image, userId }) => {
  const post = await Post.create({
    description,
    tag,
    image,
    state,
    userId,
  });
  return post;
};

const updatePost = async ({ postId, description, tag, image, state }) => {
  const post = await Post.update(
    { description, tag, image, state },
    { where: { id: postId } }
  );
  return post;
};

const deletePost = async (id) => {
  const deleteState = {
    state: false,
  };
  const post = await Post.update(deleteState, { where: { id } });
  return post;
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
};
