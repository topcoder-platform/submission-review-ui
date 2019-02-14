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
  submissionDetails: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_SUBMISSION_DETAILS_SUCCESS:
      return { ...state, submissionDetails: action.submissionDetails, isLoading: false }
    case LOAD_SUBMISSION_DETAILS_PENDING:
      return { ...state, isLoading: true }
    case LOAD_SUBMISSION_DETAILS_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
