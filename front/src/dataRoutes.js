import Auth from "./components/pages/Auth/Auth";
import SingleExercise from "./components/pages/Exercises/SingleExercises";
import Home from "./components/pages/Home/Home";
import NewExercise from "./components/pages/NewExercise/NewExercise";
import NewWorkout from "./components/pages/NewWorkout/NewWorkout";
import Profile from "./components/pages/Profile/Profile";
import ListWorkouts from "./components/pages/Workouts/ListWorkouts";
import SingleWorkout from "./components/pages/Workouts/SingleWorkout";

export const routes = [
    {
        path: '/',
        element: Home,
        auth: false
    },
    {
        path: '/auth',
        element: Auth,
        auth: false
    },
    {
        path: '/new-workout',
        element: NewWorkout,
        auth: true
    },
    {
        path: '/new-exercise',
        element: NewExercise,
        auth: true
    },
    {
        path: '/profile',
        element: Profile,
        auth: true
    },
    {
        path: '/workout/:id',
        element: SingleWorkout,
        auth: true
    },
    {
        path: '/workouts',
        element: ListWorkouts,
        auth: true
    },
    {
        path: '/exercise/:id',
        element: SingleExercise,
        auth: true
    },

]