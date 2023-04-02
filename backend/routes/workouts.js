const express = require("express")
const router = express.Router()
const {
	getWorkout,
	createWorkout,
	getWorkouts,
	deleteWorkout,
	updateWorkout,
} = require("../controllers/workoutsController")

//Get all workouts
router.get("/", getWorkouts)

//Get a workout
router.get("/:id", getWorkout)

//Create a workout
router.post("/", createWorkout)

//delete a workout
router.delete("/:id", deleteWorkout)
//update all workouts
router.patch("/:id", updateWorkout)
module.exports = router
