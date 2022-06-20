import React, {useReducer, useEffect, useState} from 'react';
import {User} from '@supabase/supabase-js';
import AuthContext, {initialState} from '../contexts/AuthContext';
import {AuthReducer} from '../reducers/authReducer';
import {login, logout, signup} from '../actions/actions';
import {supabase} from '../../lib/supabase-client';

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
    const {user, error} = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    const {data, error: InsertError} = await supabase
      .from('profiles')
      .insert({id: user?.id, updated_at: new Date()});

    if (InsertError) throw InsertError

    return user;
  };

  const handleLogin = async (email: string, password: string) => {
    const {user, error} = await supabase.auth.signIn({
      email,
      password,
    });

    if (error || !user) throw error;

    dispatchAuthReducer(login(user as User));

    return user;
  };

  const handleSetUser = (user: User) => {
    dispatchAuthReducer(login(user));
  };

  const handleLogout = async () => {
    const {error} = await supabase.auth.signOut();

    if (error) throw error;
    dispatchAuthReducer(logout());

    return true;
  };

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();
      if (sessionUser) {
        handleSetUser(sessionUser);
      }
      setIsLoading(false);
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  useEffect(() => {
    fetch('/api/set-supabase-cookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: stateAuthReducer.isAuth ? 'SIGNED_IN' : 'SIGNED_OUT',
        session: supabase.auth.session(),
      }),
    });
  }, [stateAuthReducer]);

  return (
    <AuthContext.Provider
      value={{
        isLoading: isLoading,
        authState: stateAuthReducer,
        handleUserSignUp: handleSignUp,
        handleUserLogin: handleLogin,
        handleUserLogout: handleLogout,
        handleSetUser: handleSetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
