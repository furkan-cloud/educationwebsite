const express = require('express');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
