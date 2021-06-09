import { fetchChallengeRoles, fetchResourceRoles } from '../services/resources'
import {
  LOAD_CHALLENGE_RESOURCES_PENDING,
  LOAD_CHALLENGE_RESOURCES_SUCCESS,
  LOAD_CHALLENGE_RESOURCES_FAILURE,
  LOAD_RESOURCE_ROLES_PENDING,
  LOAD_RESOURCE_ROLES_SUCCESS,
  LOAD_RESOURCE_ROLES_FAILURE
} from '../config/constants'

/**
 * Loads roles of current challenge
 * @param challenges
 */
export function loadChallengeResources (challenges) {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_CHALLENGE_RESOURCES_PENDING
    })

    const { userId } = getState().auth.user
    const promises = []

    for (let challenge of challenges) {
      promises.push(fetchChallengeRoles(challenge.id, userId))
    }

    Promise.all(promises).then((results) => {
      let roles = []
      for (let result of results) {
        roles = roles.concat(result)
      }

      dispatch({
        type: LOAD_CHALLENGE_RESOURCES_SUCCESS,
        roles
      })
    }).catch(() => dispatch({
      type: LOAD_CHALLENGE_RESOURCES_FAILURE
    }))
  }
}

/**
 * Loads role names from resources
 */
export function loadResourceRoles () {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_RESOURCE_ROLES_PENDING
    })

    fetchResourceRoles().then(resourceRoles => dispatch({
      type: LOAD_RESOURCE_ROLES_SUCCESS,
      resourceRoles
    })).catch(() => dispatch({
      type: LOAD_RESOURCE_ROLES_FAILURE
    }))
  }
}
