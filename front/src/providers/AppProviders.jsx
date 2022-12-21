import { useState } from "react";
import Routes from "../Routes";
import { AuthContext } from "../context/AuthContext";

function AppProvider() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <Routes />
    </AuthContext.Provider>
  );
}

export default AppProvider;
