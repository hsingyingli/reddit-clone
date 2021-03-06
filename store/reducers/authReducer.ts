import * as ACTION_TYPE from '../actions/action_type';
import { User } from '@supabase/supabase-js';
import {AuthActionType, AuthInfoType, ProfileType} from '../../@types/auth';
import {initialState} from '../contexts/AuthContext';

export const AuthReducer = (
  state: AuthInfoType = initialState,
  action: AuthActionType,
): AuthInfoType => {
  switch (action.type) {
    case ACTION_TYPE.LOGIN:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: action.user as User,
      };
    case ACTION_TYPE.LOGOUT:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        user: null,
      };
    case ACTION_TYPE.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ACTION_TYPE.ENDLOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ACTION_TYPE.UPDATE:
      return {
        ...state,
        isUpdate: true,
      };
    default:
      return state;
  }
};
