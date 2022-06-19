import {ProfileType} from '../@types/auth';
import {supabase} from './supabase-client';



export const getProfile = (id:string) => {
  return supabase
    .from<ProfileType>('profiles')
    .select('username, website, avatar_url')
    .eq('id', id)
    .single();

};

export const updateProfile = async (update: any) => {
  try {
    const user = supabase.auth.user();
    const updates = {
      ...update,
      id: user?.id,
      updated_at: new Date(),
    };

    let {error} = await supabase
      .from('profile')
      .upsert(updates, {returning: 'minimal'});

    if (error) throw error;
  } catch (error) {
    return false;
  }

  return true;
};
