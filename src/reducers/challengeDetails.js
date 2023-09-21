/**
 * Reducer to process actions related to challenge details
 */
import {
  LOAD_CHALLENGE_DETAILS_FAILURE,
  LOAD_CHALLENGE_DETAILS_PENDING,
  LOAD_CHALLENGE_DETAILS_SUCCESS,
  LOAD_CHALLENGES_PENDING,
  LOAD_RESOURCE_ROLES_SUCCESS,
  LOAD_RESOURCE_ROLES_PENDING,
  LOAD_RESOURCE_ROLES_FAILURE
} from '../config/constants'

const initialState = {
  isLoading: true,
  challengeDetails: {},
  challengeTypes: [],
  loadingId: null,
  resourceRoles: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CHALLENGES_PENDING:
      return { ...state, invalidChallenge: null }
    case LOAD_CHALLENGE_DETAILS_SUCCESS:
      return { ...state, challengeDetails: action.challengeDetails, isLoading: false, loadingId: null, invalidChallenge: null }
    case LOAD_CHALLENGE_DETAILS_PENDING:
      return { ...state, isLoading: true, loadingId: action.challengeId, invalidChallenge: null }
    case LOAD_CHALLENGE_DETAILS_FAILURE:
      return { ...state, isLoading: false, loadingId: null, invalidChallenge: true }
    case LOAD_RESOURCE_ROLES_SUCCESS:
      return { ...state, resourceRoles: action.resourceRoles }
    case LOAD_RESOURCE_ROLES_PENDING:
      return { ...state, resourceRoles: [] }
    case LOAD_RESOURCE_ROLES_FAILURE:
      return { ...state, resourceRoles: [] }
    default:
      return state
  }
}
