import {Session} from '@supabase/supabase-js';
import {ProfileType} from '../@types/auth';
import {supabase} from './supabase-client';

type UpdatesType = {
  username?: string;
  website?: string;
  avatar_url?: string;
};

export const getProfile = (id: string) => {
  return supabase
    .from<ProfileType>('profiles')
    .select('username, website, avatar_url')
    .eq('id', id)
    .single();
};

export const updateProfile = (updates: UpdatesType) => {
  return supabase.from('profiles').upsert(updates, {
    returning: 'minimal', // Don't return the value after inserting
  });
};

export const loginAPI = (email: string, password: string) => {
  return supabase.auth.signIn({
    email,
    password,
  });
};

export const setSupabaseCookieAPI = async (isAuth: boolean) => {
  await fetch('/api/set-supabase-cookie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: isAuth ? 'SIGNED_IN' : 'SIGNED_OUT',
      session: supabase.auth.session(),
    }),
  });
};

export const signUpAPI = (email: string, password: string) => {
  return supabase.auth.signUp({email, password});
};

