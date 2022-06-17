import * as ACTION_TYPE from './action_type'
import { AuthActionType } from '../../@types/auth';



export const login = (email: string): AuthActionType => {
  return {
    type: ACTION_TYPE.LOGIN,
    email,
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
