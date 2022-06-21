import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase-client";

const useAvatar = (url: string) => {
  const [avatarUrl, setAvatarUrl] = useState<any>(null);
  async function downloadImage(path: string) {
    try {
      const { data, error }: any = await supabase.storage.from('avatars').download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error: any) {
      console.log('Error downloading image: ', error.message);
    }
  }
  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);
  
  return avatarUrl
}

export default useAvatar;
