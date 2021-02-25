const mongoose = require('mongoose');

const Post = require("../models/post.doc");

const getPosts = async (from = 0, limit = 5, filters, attributes) => {
    const rows = await Post.find(filters, attributes).skip(from).limit(limit).exec();
    const count = await Post.find(filters).count();
    return { count, rows };
};

const getPostById = async (id) => {
    const post = await Post.findOne({ _id: id });
    return post;
};

const addPost = async ({ description, tag, state, image, userId }) => {
    const post = new Post({
        description,
        tag,
        image,
        state,
        userId,
    });
    return await post.save();
};

const updatePost = async ({ postId, description, tag, image, state }) => {
    const post = await Post.findByIdAndUpdate(postId,
        { description, tag, image, state },
        { new: true, runValidators: true }
    );
    return post;
};

const deletePost = async (id) => {
    const deleteState = {
        state: false,
    };
    const post = await Post.findByIdAndUpdate(id, deleteState);
    return post;
};

module.exports = {
    getPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost,
};
