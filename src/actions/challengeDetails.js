import * as service from '../services/mock-services'
import {
  LOAD_CHALLENGE_DETAILS_FAILURE,
  LOAD_CHALLENGE_DETAILS_PENDING,
  LOAD_CHALLENGE_DETAILS_SUCCESS,
  LOAD_CHALLENGE_TYPES_FAILURE,
  LOAD_CHALLENGE_TYPES_PENDING,
  LOAD_CHALLENGE_TYPES_SUCCESS
} from '../config/constants'

export function loadChallengeDetails (challengeId) {
  return (dispatch) => {
    dispatch({
      type: LOAD_CHALLENGE_DETAILS_PENDING
    })
    service.fetchChallengeDetails(challengeId).then(challengeDetails => dispatch({
      type: LOAD_CHALLENGE_DETAILS_SUCCESS,
      challengeDetails
    })).catch(e => dispatch({
      type: LOAD_CHALLENGE_DETAILS_FAILURE
    }))
  }
}

export function loadChallengeTypes () {
  return (dispatch, getState) => {
    // Only fetch it if it does not exist
    if (getState().challengeDetails.challengeTypes.length === 0) {
      dispatch({
        type: LOAD_CHALLENGE_TYPES_PENDING
      })
      service.fetchChallengeTypes().then(challengeTypes => dispatch({
        type: LOAD_CHALLENGE_TYPES_SUCCESS,
        challengeTypes
      })).catch(e => dispatch({
        type: LOAD_CHALLENGE_TYPES_FAILURE
      }))
    }
  }
}
