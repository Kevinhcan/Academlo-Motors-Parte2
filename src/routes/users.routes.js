const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const validdationMiddleware = require('./../middlewares/validations.middleware');
const userMiddleware = require('./../middlewares/user.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

// Rutas de usuarios

router
  .route('/')
  .get(authMiddleware.protect, userController.getUsers)
  .post(validdationMiddleware.createUserValidation, userController.createUsers);

  router.post('/login', userMiddleware.existEmail, userController.login);


router.use(authMiddleware.protect);

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
