import {User} from "@supabase/supabase-js";

export type ProfileType = {
  id: string;
  email: string;
  username: string;
  website: string;
  avatar_url: string;
}

export type AuthActionType = {
  type: string;
  user?: User;
}


export type AuthInfoType = {
  isAuth: boolean;
  user: User | null;
  isLoading: boolean;
  isUpdate: boolean;
}

export type AuthContextType = {
  isLoading: boolean;
  authState: AuthInfoType;
  handleUserSignUp: (_email: string, _password: string) => Promise<void>,
  handleUserLogin: (_email: string, _password: string)=> Promise<void>;
  handleUserLogout: () => void;
  handleUserUpdate: () => void;
}


