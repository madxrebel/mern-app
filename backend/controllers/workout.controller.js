const Workout = require('../models/workouts.models');
const mongoose = require('mongoose');

// GET all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts);
}


// GET single workout
const getWorkout = async (req, res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"});
    }


    const workout = await Workout.findById(id);
    
    if(!workout) {
        return res.status(404).json({error: "No such workout"});
    }
    
    res.status(200).json(workout);

}


// POST a new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;

    let emptyFields = [];

    if(!title) {
        emptyFields.push("title");
    }
    if(!load) {
        emptyFields.push("load");
    }
    if(!reps) {
        emptyFields.push("reps");
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all fields", emptyFields});
    }

    try {
        const workout = await Workout.create({title, reps, load});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    res.json({mssg: "POST a new workout"});
}


// DELETE a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"});
    }
    try {
        const workout = await Workout.findByIdAndDelete(id);
        res.status(200).json({workout});
    }
    catch (error) {
        res.status(400).json({error: error.message})
    } 
} 


// PATCH a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"});
    }
    
    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body});

    if(!workout) {
        return res.status(400).json({error: "No such workout"});
    }

    res.status(200).json(workout);

}



module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};