const User = require('../models/user.model');
const generateJWT = require('../utils/jwt');
const bcrypt = require('bcryptjs');

// Traer todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: 'available',
      },
    });

    return res.status(200).json({
      status: 'success',
      users,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong 😢',
    });
  }
};

// Traer un usuario por id
exports.getUserById = async (req, res) => {
  try {
    const { user } = req;
    return res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong 😢',
    });
  }
};

// Crear un nuevo usuario
exports.createUsers = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });

    const token = await generateJWT(user.id);

    return res.status(200).json({
      status: 'success',
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong 😢',
    });
  }
};

// Actualizar datos de un usuario
exports.updateUser = async (req, res) => {
  try {
    const { user } = req;
    const { name, email } = req.body;

    await user.update({ name, email });
    return res.status(200).json({
      status: 'success',
      message: 'User updated ✌️',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong 😢',
    });
  }
};

// Eliminar por completo un usuario
exports.deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await user.update({ status: 'disbaled' });
    return res.status(200).json({
      status: 'succes',
      message: 'User deleted ✌️',
    });
  } catch (error) {   
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong 😢',

    });
  }
};

exports.login = async (req, res, next) => {
  const { user } = req;
  const { password } = req.body;

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'Incorrect email or password 😒',
    });
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'success',
    token,
    user,
  });
};
