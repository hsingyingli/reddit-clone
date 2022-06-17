import { createContext } from "react";
import { AuthContextType, AuthInfoType } from "../../@types/auth";

export const initialState: AuthInfoType = {
  isAuth: false,
  username: "",
  email: "",
  isLoading: false,
} 
const AuthContext = createContext<AuthContextType>({
  authState: initialState,
});

export default AuthContext;
