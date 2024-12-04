import _ from 'lodash'
import { fetchChallengeDetails, fetchMemberResourcesOnChallenge, fetchMemberResourceRoles } from '../services/challenges'
import {
  LOAD_CHALLENGE_DETAILS_FAILURE,
  LOAD_CHALLENGE_DETAILS_PENDING,
  LOAD_CHALLENGE_DETAILS_SUCCESS,
  LOAD_RESOURCE_ROLES_SUCCESS,
  LOAD_RESOURCE_ROLES_PENDING,
  LOAD_RESOURCE_ROLES_FAILURE
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
      const { resourceRoles } = getState().challengeDetails

      if (!resourceRoles || resourceRoles.length === 0) {
        try {
          dispatch({
            type: LOAD_RESOURCE_ROLES_PENDING
          })
          const _resourceRoles = await fetchMemberResourceRoles()
          dispatch({
            type: LOAD_RESOURCE_ROLES_SUCCESS,
            resourceRoles: [
              ..._resourceRoles
            ]
          })
        } catch (e) {
          dispatch({
            type: LOAD_RESOURCE_ROLES_FAILURE
          })
        }
      }

      try {
        const memberResourcesOnChallenge = await fetchMemberResourcesOnChallenge(userId, challengeId)
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
        dispatch({
          type: LOAD_CHALLENGE_DETAILS_FAILURE
        })
      }
    }
  }
}
