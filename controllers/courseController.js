const Course = require('../models/Course');
const Category = require('../models/Category');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });
    res.status(201).redirect('/courses');
    // json({
    //   status: 'success',
    //   course,
    // });
  } catch (error) {
    res.status(400).json({ status: 'failed', error });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort('-createdAt');
    const categories = await Category.find();
    // res.status(200).json({
    //   status: 'success',
    //   courses,
    // });
    res.status(200).render('courses', {
      courses,
      categories,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({ status: 'failed', error });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const slug = req.params.slug;
    const course = await Course.findOne({ slug: slug }).populate('user');

    res.status(200).render('course', {
      course,
      page_name: 'course',
    });
  } catch (error) {
    res.status(400).json({ status: 'failed', error });
  }
};
