const express = require('express');
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workout.controller');

const router = express.Router();

// Get all workouts
router.get('/', getWorkouts);

// Get single workout
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

// Update a workout
router.patch('/:id', updateWorkout);

module.exports = router;