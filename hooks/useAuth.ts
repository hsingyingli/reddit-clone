import { useContext } from "react";
import AuthContext from "../store/contexts/AuthContext";

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth;
