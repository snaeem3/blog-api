const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 200 },
  content: [{ type: String, required: true }],
  date: { type: Date, default: Date.now() },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

// Virtual for post's URL
PostSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/posts/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);
