import React, {useEffect} from 'react';
import {supabase} from '../../lib/supabase-client';
import useAuth from '../../hooks/useAuth';

interface SupaProviderProps {
  children: React.ReactNode;
}

const SupaProvider: React.FC<SupaProviderProps> = ({children}) => {
  const {authState, handleSetUser} = useAuth();

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();
      if (sessionUser) {
        handleSetUser(sessionUser)
      }
    };

    if (!authState.isAuth) getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, [handleSetUser, authState]);

  return <>{children}</>;
};

export default SupaProvider;
