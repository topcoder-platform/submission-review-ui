import _ from 'lodash'
import { fetchChallengeDetails, fetchMemberResourcesOnChallenge, fetchMemberResourceRoles } from '../services/challenges'
import {
  LOAD_CHALLENGE_DETAILS_FAILURE,
  LOAD_CHALLENGE_DETAILS_PENDING,
  LOAD_CHALLENGE_DETAILS_SUCCESS,
} from '../config/constants'

/**
 * Load challenge details
 * @param {String} challengeId
 */
export function loadChallengeDetails (challengeId) {
  return async (dispatch, getState) => {
    const getLoadingId = () => _.get(getState(), 'challengeDetails.loadingId')

    // if it's not loading already
    if (challengeId !== getLoadingId()) {
      dispatch({
        type: LOAD_CHALLENGE_DETAILS_PENDING,
        challengeId
      })

      const { userId } = getState().auth.user

      try {
        const memberResourcesOnChallenge = await fetchMemberResourcesOnChallenge(userId, challengeId)
        const resourceRoles = await fetchMemberResourceRoles()
        const roles = memberResourcesOnChallenge.map(r => {
          const role = resourceRoles.find(rr => rr.id === r.roleId)
          return role ? role.name : ''
        })

        const challengeDetails = await fetchChallengeDetails(challengeId)

        // prevent possible race condition
        if (challengeId === getLoadingId()) {
          dispatch({
            type: LOAD_CHALLENGE_DETAILS_SUCCESS,
            challengeDetails: {
              ...challengeDetails,
              roles
            }
          })
        }
      } catch (error) {
        console.error(error)
        dispatch({
          type: LOAD_CHALLENGE_DETAILS_FAILURE
        })
      }
    }
  }
}

