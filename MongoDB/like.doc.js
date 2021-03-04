const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let CommentSchema = new Schema({
  postId: {
    type: Number,
    required: [true, "post associated is required"],
  },
  author: {
    type: Number,
    required: [true, "user is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateddAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
