/**
 * Reducer to process authentication actions
 */
import { LOAD_USER_SUCCESS } from '../config/constants'

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  user: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return { ...state, user: action.user, isLoading: false, isLoggedIn: true }
    default:
      return state
  }
}
