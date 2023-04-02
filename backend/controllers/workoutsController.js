const Workout = require("../models/workoutsModel")
const mongoose = require("mongoose")

//validate id
const validateId = (id, res) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout" })
	}
}
//Get all workouts
const getWorkouts = async (req, res) => {
	const rest = await Workout.find({}).sort({ createdAt: -1 })
	res.status(200).json(rest)
}

//Get a workout
const getWorkout = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout" })
	}
	const rest = await Workout.findById(id)
	if (!rest) {
		return res.status(404).json({ error: "No such workout" })
	}
	res.status(200).json(rest)
}

// Create workout
const createWorkout = async (req, res) => {
	const { title, reps, load } = req.body
	try {
		const rest = await Workout.create({ title, reps, load })
		res.status(200).json(rest)
	} catch (error) {
		console.log(error.message)
		res.status(400).json({ error: error.message })
	}
}

//Delete a workout
const deleteWorkout = async (req, res) => {
	const { id } = req.params
	validateId(id, res)
	const rest = await Workout.findByIdAndDelete(id)
	if (!rest) {
		return res.status(404).json({ error: "No such workout" })
	}
	res.status(200).json(rest)
}

//Update a workouts
const updateWorkout = async (req, res) => {
	const { id } = req.params
	validateId(id, res)
	const rest = await Workout.findByIdAndUpdate(id, req.body, { new: true })
	if (!rest) {
		return res.status(404).json({ error: "No such workout" })
	}
	res.status(200).json(rest)
}

module.exports = {
	getWorkout,
	getWorkouts,
	createWorkout,
	deleteWorkout,
	updateWorkout,
}
