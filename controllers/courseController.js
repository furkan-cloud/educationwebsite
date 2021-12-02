const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (error) {
    res.status(400).json({ status: 'failed', error });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    // res.status(200).json({
    //   status: 'success',
    //   courses,
    // });
    res.status(200).render('courses', {
      courses,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({ status: 'failed', error });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const slug = req.params.slug;
    const course = await Course.findOne({ slug: slug });

    res.status(200).render('course', {
      course,
      page_name: 'course',
    });
  } catch (error) {
    res.status(400).json({ status: 'failed', error });
  }
};
