import * as ACTION_TYPE from './action_type'
import { User } from '@supabase/supabase-js';
import { AuthActionType} from '../../@types/auth';

export const signup = (user: User): AuthActionType => {
  return {
    type: ACTION_TYPE.SIGNUP,
    user
  }
} 

export const login = (user: User): AuthActionType => {
  return {
    type: ACTION_TYPE.LOGIN,
    user
  }
}

export const logout = (): AuthActionType => {
  return {
    type: ACTION_TYPE.LOGOUT,
  };
};

export const loading = (): AuthActionType => {
  return {
    type: ACTION_TYPE.LOADING
  }
}

export const endLoading = (): AuthActionType => {
  return {
    type: ACTION_TYPE.ENDLOADING
  }
}


export const update = (): AuthActionType => {
  return {
   type: ACTION_TYPE.UPDATE,
  }
}
