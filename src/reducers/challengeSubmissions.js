/**
 * Reducer to process actions related to challenge details
 */
import {
  LOAD_CHALLENGE_SUBMISSIONS_FAILURE,
  LOAD_CHALLENGE_SUBMISSIONS_PENDING,
  LOAD_CHALLENGE_SUBMISSIONS_SUCCESS,
  LOAD_SUBMITTERS_SUCCESS,
  LOAD_SUBMITTERS_PENDING,
  LOAD_SUBMITTERS_FAILURE
} from '../config/constants'

const initialState = {
  isLoading: true,
  loadingId: null,
  loadingIdOfSubmitters: null,
  challengeId: null,
  challengeSubmissions: [],
  submitters: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CHALLENGE_SUBMISSIONS_SUCCESS:
      return {
        ...state,
        challengeSubmissions: action.challengeSubmissions,
        isLoading: false,
        loadingId: null,
        challengeId: state.loadingId,
        submitters: []
      }
    case LOAD_CHALLENGE_SUBMISSIONS_PENDING:
      return { ...state, isLoading: true, loadingId: action.challengeId, challengeId: null, submitters: [] }
    case LOAD_CHALLENGE_SUBMISSIONS_FAILURE:
      return { ...state, isLoading: false, loadingId: null, challengeId: null, challengeSubmissions: [], submitters: [] }
    case LOAD_SUBMITTERS_SUCCESS:
      return {
        ...state,
        submitters: action.submitters,
        isLoading: false,
        loadingIdOfSubmitters: null
      }
    case LOAD_SUBMITTERS_PENDING:
      return { ...state, isLoading: true, loadingIdOfSubmitters: action.challengeId, submitters: [] }
    case LOAD_SUBMITTERS_FAILURE:
      return { ...state, isLoading: false, loadingIdOfSubmitters: null, submitters: [] }
    default:
      return state
  }
}
