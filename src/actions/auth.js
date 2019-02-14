import * as service from '../services/mock-services'
import { LOAD_USER_SUCCESS } from '../config/constants'

export function loadUser () {
  return (dispatch, getState) => {
    if (!getState().auth.user) {
      service.fetchAuthenticatedUser().then(user => {
        dispatch({
          type: LOAD_USER_SUCCESS,
          user
        })
      })
    }
  }
}
