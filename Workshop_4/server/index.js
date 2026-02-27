const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courseRoutes');
const professorRoutes = require('./routes/professorRoutes');
const authRoutes = require('./routes/authRoutes');

// Database connection
mongoose.connect('mongodb+srv://rquesada:admin123@cluster0.r4xmzby.mongodb.net/?appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors({
    domains: '*',
    methods: '*'
}));

// Routes
app.use('/', authRoutes);
app.use('/', courseRoutes);
app.use('/', professorRoutes);

// Start the app
app.listen(3001, () => console.log(`UTN API service listening on port 3001!`));
