import React, {useReducer} from 'react';
import AuthContext, {initialState} from '../contexts/AuthContext';
import {AuthReducer} from '../reducers/authReducer';
import {login, logout} from '../actions/actions';
import {supabase} from '../../lib/supabase-client';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(
    AuthReducer,
    initialState,
  );

  const handleLogin = async (email: string) => {
    try {
      const {error} = await supabase.auth.signIn({email});
      if (error) throw error;
      dispatchAuthReducer(login(email));
    } catch (error) {
      return false;
    }
    return true;
  };

  const handleLogout = async () => {
    try {
      const {error} = await supabase.auth.signOut();
      if (error) throw error;
      dispatchAuthReducer(logout());
    } catch (error) {
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        authState: stateAuthReducer,
        handleUserLogin: handleLogin,
        handleUserLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
