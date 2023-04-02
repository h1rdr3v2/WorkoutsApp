import { useEffect, useState } from "react"
import WorkoutDetail from "../components/workoutsDetails"
import loadinggif from "../loading.gif"
const Home = () => {
	const [workout, setWorkout] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchWorkout = async () => {
			const workout = await fetch("http://localhost:4000/api/workouts")
			const json = await workout.json()
			if (workout.ok) {
				setWorkout(json)
				setLoading(false)
			}
		}
		fetchWorkout()
	}, [])
	if (loading) {
		return (
			<div className="loading">
				<img className="gifloading" src={loadinggif} alt="Loading..." />
			</div>
		)
	}
	return (
		<div className="home">
			<div className="workouts">
				{workout &&
					workout.map((workout) => (
						<>
							<WorkoutDetail
								key={workout._id}
								workout={workout}
							/>
						</>
					))}
			</div>
		</div>
	)
}
export default Home
