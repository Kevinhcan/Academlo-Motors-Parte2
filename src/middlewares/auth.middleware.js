const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({
      status: 'error',
      message: 'You are not logged in! Please log in to get access'
    })
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });

  if (!user) {
    res.status(401).json({
      status: 'error',
      message: 'The owner of this token it not longer available'
    })
    return next(
      new AppError('The owner of this token it not longer available', 401)
    );
  }

  req.sessionUser = user;
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      res.status(401).json({
        status: 'error',
        message: 'You do not have permission to perfom this action.!'
      })      
      return next(
        new AppError('You do not have permission to perfom this action.!', 403)
      );
    }

    next();
  };
};
