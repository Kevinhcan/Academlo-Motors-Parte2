const express = require('express');
const router = express.Router();
const repairController = require('../controllers/repairs.controller');
const validdationMiddleware = require('./../middlewares/validations.middleware');
const repairMiddleware = require('./../middlewares/repair.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

// Rutas de reparaciones

router.use(authMiddleware.protect);

router
  .route('/')
  .get(authMiddleware.restrictTo('employee'), repairController.getRepairs)
  .post(repairController.createRepair);

router
  .use('/:id', repairMiddleware.existRepair)
  .use(authMiddleware.restrictTo('employee'))
  .route('/:id')
  .get(repairController.getRepairById)
  .patch(repairController.update)
  .delete(repairController.delete);

module.exports = router;
