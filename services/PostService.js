// const PostRepository = require("../repository/PostRepository");
const PostRepository = require('../MongoRepository/PostRepository');

const getPosts = async (from = 0, limit = 5, filters, attributes) => {
  let defaultFilters = {
    state: true,
  };

  if (!filters) {
    filters = defaultFilters;
  }

  const data = await PostRepository.getPosts(from, limit, filters, attributes);
  return data;
};

const getPostById = async (id) => {
  const post = await PostRepository.getPostById(id);
  return post;
};

const addPost = async ({ description, tag, image, state }) => {
  const post = await PostRepository.addPost({
    description,
    tag,
    image,
    state,
  });
  return post;
};

const updatePost = async ({ postId, description, image, tag, state }) => {
  const post = await PostRepository.updatePost(
    postId,
    description,
    image,
    tag,
    state
  );
  return post;
};

const deletePost = async (id) => {
  const post = PostRepository.deletePost(id);
  return post;
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
};
