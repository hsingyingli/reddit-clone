import {ProfileType} from '../@types/auth';
import {supabase} from './supabase-client';


type UpdatesType = {
  username?: string;
  website?: string;
  avatar_url?: string;
}

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
