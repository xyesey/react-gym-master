import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  return {
    isAuth,
    setIsAuth,
  };
}

export default useAuth;
