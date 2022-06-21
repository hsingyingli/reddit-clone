import React, {useReducer, useEffect, useState} from 'react';
import {User} from '@supabase/supabase-js';
import AuthContext, {initialState} from '../contexts/AuthContext';
import {AuthReducer} from '../reducers/authReducer';
import {login, logout, update, loading, endLoading} from '../actions/actions';
import {supabase} from '../../lib/supabase-client';
import {useRouter} from 'next/router';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(
    AuthReducer,
    initialState,
  );

  const handleSignUp = async (email: string, password: string) => {
    dispatchAuthReducer(loading())
    const {user, error} = await supabase.auth.signUp({
      email,
      password,
    });

    dispatchAuthReducer(endLoading())
    if (error) throw error;

    return user;
  };

  const handleLogin = async (email: string, password: string) => {
    dispatchAuthReducer(loading())
    const {user, error} = await supabase.auth.signIn({
      email,
      password,
    });

    dispatchAuthReducer(endLoading())
    if (error || !user) throw error;

    dispatchAuthReducer(login(user as User));

    return user;
  };

  const handleSetUser = (user: User) => {
    dispatchAuthReducer(loading())
    dispatchAuthReducer(login(user));
    dispatchAuthReducer(endLoading())
  };

  const handleLogout = async () => {
    dispatchAuthReducer(loading())
    const {error} = await supabase.auth.signOut();
    dispatchAuthReducer(endLoading())
    if (error) throw error;
    dispatchAuthReducer(logout());
    router.push('/');

    return true;
  };

  const handleUpdate = () => {
    dispatchAuthReducer(loading())
    dispatchAuthReducer(update());
    dispatchAuthReducer(endLoading())
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
        handleUpdateUser: handleUpdate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
