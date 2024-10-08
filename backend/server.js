require('dotenv').config();

const express = require('express');
const mongoose =  require('mongoose');
const workoutRoutes = require('./routes/workouts');

const PORT = process.env.PORT || 4000;

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/workouts' , workoutRoutes);

// connect the database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for request
    app.listen(PORT, () => {
        console.log(`connected to db & Server is running on port ${PORT}`);
    })
})
.catch((error) => {
    console.log(error)
})

