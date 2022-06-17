export type AuthActionType = {
  type: string;
  email?: string;
}


export type AuthInfoType = {
  isAuth: boolean;
  username: string;
  email: string;
  isLoading: boolean;
}

export type AuthContextType = {
  authState: AuthInfoType;
  handleUserLogin?: (_value: string)=> Promise<boolean>;
  handleUserLogout?: () => Promise<boolean>; 
}


