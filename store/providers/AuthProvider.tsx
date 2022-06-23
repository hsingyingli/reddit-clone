import React, {useReducer, useEffect, useState} from 'react';
import AuthContext, {initialState} from '../contexts/AuthContext';
import {AuthReducer} from '../reducers/authReducer';
import {login, logout, update, loading, endLoading} from '../actions/actions';
import {supabase} from '../../lib/supabase-client';

import {
  signUpAPI,
  loginAPI,
  setSupabaseCookieAPI,
} from '../../lib/auth';
import {User} from '@supabase/supabase-js';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(
    AuthReducer,
    initialState,
  );

  const handleSignUp = async (email: string, password: string) => {
    const {user, error} = await signUpAPI(email, password);
    if (error) throw error;
  };

  const handleLogin = async (email: string, password: string) => {
    dispatchAuthReducer(loading());
    const {user, error} = await loginAPI(email, password);
    dispatchAuthReducer(endLoading());

    if (error) throw error;
    dispatchAuthReducer(login(user as User));
  };

  const handleLogout = async () => {
    dispatchAuthReducer(loading());
    const {error} = await supabase.auth.signOut();
    dispatchAuthReducer(endLoading());
    if (error) throw error
    dispatchAuthReducer(logout());

  };

  const handleUpdate = () => {
    dispatchAuthReducer(update());
  };

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();
      if (sessionUser) {
        dispatchAuthReducer(login(sessionUser));
      }
      setIsLoading(false);
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  useEffect(() => {
    setSupabaseCookieAPI(stateAuthReducer.isAuth);
  }, [stateAuthReducer]);

  return (
    <AuthContext.Provider
      value={{
        isLoading: isLoading,
        authState: stateAuthReducer,
        handleUserSignUp: handleSignUp,
        handleUserLogin: handleLogin,
        handleUserLogout: handleLogout,
        handleUserUpdate: handleUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
