const Professor = require('../models/profesor');

// Create a new professor
const createProfessor = async (req, res) => {
    const professor = new Professor({
        name: req.body.name,
        surname: req.body.surname,
        id: req.body.id,
        age: req.body.age
    });

    try {
        const professorCreated = await professor.save();
        res.header('Location', `/professors?id=${professorCreated._id}`);
        res.status(201).json(professorCreated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all professors or a single professor by id
const getProfessors = async (req, res) => {
    try {
        if (!req.query.id) {
            const data = await Professor.find();
            return res.status(200).json(data);
        }
        const data = await Professor.findById(req.query.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a professor
const deleteProfessor = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({ message: "id query param is required" });
        }
        await Professor.findByIdAndDelete(req.query.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a professor
const updateProfessor = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({ message: "id query param is required" });
        }
        const professor = await Professor.findById(req.query.id);
        if (!professor) {
            return res.status(404).json({ message: "Professor not found" });
        }
        professor.name = req.body.name;
        professor.surname = req.body.surname;
        professor.id = req.body.id;
        professor.age = req.body.age;
        const professorUpdated = await professor.save();
        res.status(200).json(professorUpdated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProfessor,
    getProfessors,
    deleteProfessor,
    updateProfessor
};
