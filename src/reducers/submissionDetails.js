/**
 * Reducer to process actions related to submission details
 */
import {
  LOAD_SUBMISSION_DETAILS_FAILURE,
  LOAD_SUBMISSION_DETAILS_PENDING,
  LOAD_SUBMISSION_DETAILS_SUCCESS
} from '../config/constants'

const initialState = {
  isLoading: true,
  loadingId: null,
  submissionDetails: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_SUBMISSION_DETAILS_SUCCESS:
      return { ...state, submissionDetails: action.submissionDetails, isLoading: false, loadingId: null }
    case LOAD_SUBMISSION_DETAILS_PENDING:
      return { ...state, isLoading: true, loadingId: action.submissionId }
    case LOAD_SUBMISSION_DETAILS_FAILURE:
      return { ...state, isLoading: false, loadingId: null }
    default:
      return state
  }
}
