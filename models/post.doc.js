const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PostSchema = new Schema({
    description: {
        type: String,
        required: [true, "description is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    img: {
        type: String,
    },
    state: {
        type: Boolean,
        default: true,
    },
    comments: [
        {
            text: {
                type: String,
                required: [true, "Text is required"],
            },
            author: {
                type: String,
                required: [true, "your name is required"],
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user is required"],
    },
});

module.exports = mongoose.model("Post", PostSchema);
