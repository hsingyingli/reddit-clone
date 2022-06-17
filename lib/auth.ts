import {supabase} from './supabase-client';

export const getProfile= async () => {
  try {
    const user = supabase.auth.user();
    console.log(user)
    let {data, error, status} = await supabase
      .from('profile')
      .select('username, website, avatar_url')
      .eq('id', user?.id);

    if (error && status !== 406) throw error;
    

    return {data, error: null};
  } catch (error) {
    return {data: null, error: error};
  }
};


export const updateProfile = async (update: any) => {
  try {
    const user = supabase.auth.user();
    const updates = {
      ...update,
      id: user?.id,
      updated_at: new Date(),
      
    }

    let {error} = await supabase.from('profile').upsert(updates, {returning: "minimal"})

    if (error) throw error
  } catch (error) {
    return false
  }

  return true
}
