import {User} from "@supabase/supabase-js";

export type ProfileType = {
  username: string;
  website: string;
  avatar_url: string;
}

export type AuthActionType = {
  type: string;
  user?: User
}


export type AuthInfoType = {
  isAuth: boolean;
  user: User| null | undefined;
  isLoading: boolean;
}

export type AuthContextType = {
  isLoading: boolean;
  authState: AuthInfoType;
  handleUserSignUp: (_email: string, _password: string) => Promise<User | null>,
  handleUserLogin: (_email: string, _password: string)=> Promise<User | null>;
  handleUserLogout: () => Promise<boolean>; 
  handleSetUser: (_user: User) => void;
}


