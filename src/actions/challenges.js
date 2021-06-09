import { fetchMemberChallenges } from '../services/challenges'
import {
  LOAD_CHALLENGES_FAILURE,
  LOAD_CHALLENGES_PENDING,
  LOAD_CHALLENGES_SUCCESS
} from '../config/constants'

/**
 * Loads active challenges of the authenticated user
 */
export function loadChallenges () {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_CHALLENGES_PENDING
    })

    const { userId } = getState().auth.user

    fetchMemberChallenges(userId).then(challenges => dispatch({
      type: LOAD_CHALLENGES_SUCCESS,
      challenges
    })).catch(() => dispatch({
      type: LOAD_CHALLENGES_FAILURE
    }))
  }
}
