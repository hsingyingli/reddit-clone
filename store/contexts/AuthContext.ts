import {createContext} from 'react';
import {AuthContextType, AuthInfoType, ProfileType} from '../../@types/auth';

export const initialState: AuthInfoType = {
  isAuth: false,
  user: null,
  isLoading: false,
};
const AuthContext = createContext<AuthContextType>({
  authState: initialState,
  handleUserSignUp: (_email: string, _password: string) =>
    new Promise(() => null),
  handleUserLogin: (_email: string, _password: string) =>
    new Promise(() => null),
  handleUserLogout: () => new Promise(() => false),
  handleSetUser: () => {},
});

export default AuthContext;
