const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');
const authMiddleware = require('../middlewares/authMiddleware');

// Professor routes (all protected)
router.post('/professors', authMiddleware, professorController.createProfessor);
router.get('/professors', authMiddleware, professorController.getProfessors);
router.delete('/professors', authMiddleware, professorController.deleteProfessor);
router.put('/professors', authMiddleware, professorController.updateProfessor);

module.exports = router;
