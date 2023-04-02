require("dotenv").config()
const express = require("express")
const workoutsRoutes = require("./routes/workouts")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

//middleware
app.use(
	cors({
		origin: "http://localhost:3000",
	})
)
app.use(express.json())
app.use((req, res, next) => {
	console.log(`${req.path} ${req.method}`)
	next()
})
app.use("/api/workouts", workoutsRoutes)
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log("Running db and server at", process.env.PORT)
		})
	})
	.catch((e) => {
		console.log(e)
	})
