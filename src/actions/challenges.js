import * as service from '../services/mock-services'
import { LOAD_CHALLENGES_FAILURE, LOAD_CHALLENGES_PENDING, LOAD_CHALLENGES_SUCCESS } from '../config/constants'

export function loadChallenges () {
  return (dispatch) => {
    dispatch({
      type: LOAD_CHALLENGES_PENDING
    })
    service.fetchChallenges().then(challenges => dispatch({
      type: LOAD_CHALLENGES_SUCCESS,
      challenges
    })).catch(e => dispatch({
      type: LOAD_CHALLENGES_FAILURE
    }))
  }
}
