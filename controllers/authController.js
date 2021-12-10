const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
    // json({
    //   status: 'success',
    //   user,
    // });
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors.array()[0].msg);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `${errors.array()[i].msg}`);
    }

    res.status(400).redirect('/register');
    // res.status(400).json({ status: 'failed', error });
  }
};

// async await varken hata veriyor ve çalışmıyor?
exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('1');
    User.findOne({ email }, (err, user) => {
      if (user) {
        console.log('2');
        bcrypt.compare(password, user.password, (err, same) => {
          // USER SESSION
          if (same) {
            req.session.userID = user._id;
            res.status(200).redirect('/users/dashboard');
          } else {
            console.log('3');
            req.flash('error', `Your password is not correct`);
            return res.status(400).redirect('/login');
          }
        });
      } else {
        console.log('4');
        req.flash('error', `User is not exist`);
        return res.status(400).redirect('/login');
      }
    });
  } catch (error) {
    console.log('5');
    return res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    'courses'
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses,
  });
};
