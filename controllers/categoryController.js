const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).redirect('/users/dashboard');
    // json({
    //   status: 'success',
    //   category,
    // });
  } catch (error) {
    res.status(400).json({ status: 'failed', error });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({ status: 'failed', error });
  }
};
