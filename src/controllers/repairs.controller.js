const Repair = require('../models/repair.model');

// Traer todas las reparaciones pendientes
exports.getRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },
    });

    return res.status(200).json({
      status: 'succes',
      repairs,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong 😢',
    });
  }
};


// Traer una reparación pendiente por id
exports.getRepairById = async (req, res) => {
  try {
    const { repair } = req;

    return res.status(200).json({
      status: 'succes',
      repair,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong 😢',
    });
  }
};

// Crear una cita nueva
exports.createRepair = async (req, res) => {
  try {
    const { date, userId, description, motorsNumber } = req.body;

    const repair = await Repair.create({ date, userId, description, motorsNumber });

    return res.status(200).json({
      status: 'succes',
      repair,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong 😢',
    });
  }
};


// Actualizar el estado de una reparación a completado
exports.update = async (req, res) => {
  try {
    const { repair } = req;

    await repair.update({
      status: 'completed',
    });

    return res.status(200).json({
      status: 'succes',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong 😢',
    });
  }
};


exports.delete = async (req, res) => {
  try {
    const { repair } = req;

    await repair.update({
      status: 'canceled',
    });

    return res.status(200).json({
      status: 'succes',
      message: 'repair deleted ➖',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong 😢',
    });
  }
};
