const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const Course = require('./models/course');

mongoose.connect('mongodb+srv://rquesada:admin123@cluster0.r4xmzby.mongodb.net/?appName=Cluster0');
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});


const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors({
  domains: '*',
  methods: '*'
}));


//routes API (deben ir ANTES del static middleware)
app.get('/', (req, res) => {
    res.send('Welcome to UTN API')
})


app.post('/courses', async (req, res) => {
    const course = new Course({
        name: req.body.name,
        credits: req.body.credits,
        code: req.body.code,
        description: req.body.description
    })

    try {
        const courseCreated = await course.save();
        //add header location to the response
        res.header('Location', `/courses?id=${courseCreated._id}`);
        res.status(201).json(courseCreated)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

app.get('/courses', async (req, res) => {
    try{
        //if id is passed as query param, return single course else return all courses
        if(!req.query.id){
            const data = await Course.find();
            return res.status(200).json(data)
        }
        const data = await Course.findById(req.query.id);
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.delete('/courses', async (req, res) => {
    try{
        if(!req.query.id){
            return res.status(400).json({message: "id query param is required"})
        }
        await Course.findByIdAndDelete(req.query.id);
        res.status(204).json()
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.put('/courses', async (req, res) => {
    try{
        if(!req.query.id){
            return res.status(400).json({message: "id query param is required"})
        }
        const course = await Course.findById(req.query.id);
        if(!course){
            return res.status(404).json({message: "Course not found"})
        }
        course.name = req.body.name;
        course.credits = req.body.credits;
        course.code = req.body.code;
        course.description = req.body.description;
        const courseUpdated = await course.save();
        res.status(200).json(courseUpdated)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//start the app
app.listen(3001, () => console.log(`UTN API service listening on port 3001!`))
