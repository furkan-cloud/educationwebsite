const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const course = await Category.create(req.body);
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (error) {
    res.status(400).json({ status: 'failed', error });
  }
};
