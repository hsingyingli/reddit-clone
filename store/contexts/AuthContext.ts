import {createContext} from 'react';
import {AuthContextType, AuthInfoType} from '../../@types/auth';

export const initialState: AuthInfoType = {
  isAuth: false,
  user: null,
  isLoading: false,
  isUpdate: false,
};
const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  authState: initialState,
  handleUserSignUp: (_email: string, _password: string) =>
    new Promise(() => null),
  handleUserLogin: (_email: string, _password: string) =>
    new Promise(() => null),
  handleUserLogout: () => new Promise(() => false),
  handleSetUser: () => {},
  handleUpdateUser: ()=> {},
});

export default AuthContext;
