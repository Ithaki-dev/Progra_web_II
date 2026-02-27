const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');

// Course routes (all protected)
router.post('/courses', authMiddleware, courseController.createCourse);
router.get('/courses', authMiddleware, courseController.getCourses);
router.delete('/courses', authMiddleware, courseController.deleteCourse);
router.put('/courses', authMiddleware, courseController.updateCourse);

module.exports = router;
