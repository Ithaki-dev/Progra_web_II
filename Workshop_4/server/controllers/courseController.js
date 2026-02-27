const Course = require('../models/course');

// Create a new course
const createCourse = async (req, res) => {
    const course = new Course({
        name: req.body.name,
        credits: req.body.credits,
        code: req.body.code,
        description: req.body.description
    });

    try {
        const courseCreated = await course.save();
        res.header('Location', `/courses?id=${courseCreated._id}`);
        res.status(201).json(courseCreated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all courses or a single course by id
const getCourses = async (req, res) => {
    try {
        if (!req.query.id) {
            const data = await Course.find();
            return res.status(200).json(data);
        }
        const data = await Course.findById(req.query.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a course
const deleteCourse = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({ message: "id query param is required" });
        }
        await Course.findByIdAndDelete(req.query.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a course
const updateCourse = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({ message: "id query param is required" });
        }
        const course = await Course.findById(req.query.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        course.name = req.body.name;
        course.credits = req.body.credits;
        course.code = req.body.code;
        course.description = req.body.description;
        const courseUpdated = await course.save();
        res.status(200).json(courseUpdated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCourse,
    getCourses,
    deleteCourse,
    updateCourse
};
