// import Home from "./components/pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
// import NewWorkout from "./components/pages/NewWorkout/NewWorkout";
// import Auth from "./components/pages/Auth/Auth";
import { routes } from "./dataRoutes";

function App() {
  const { isAuth } = useAuth();
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          if (route.auth && !isAuth) {
            return false;
          }
          return (
            <Route
              path={route.path}
              element={<route.element />}
              key={`route ${route.path}`}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
