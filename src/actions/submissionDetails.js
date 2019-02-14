import * as service from '../services/mock-services'
import {
  LOAD_SUBMISSION_DETAILS_FAILURE,
  LOAD_SUBMISSION_DETAILS_PENDING,
  LOAD_SUBMISSION_DETAILS_SUCCESS
} from '../config/constants'

export function loadSubmissionDetails (submissionId) {
  return (dispatch) => {
    dispatch({
      type: LOAD_SUBMISSION_DETAILS_PENDING
    })
    service.fetchSubmissionDetails().then(submissionDetails => dispatch({
      type: LOAD_SUBMISSION_DETAILS_SUCCESS,
      submissionDetails
    })).catch(e => dispatch({
      type: LOAD_SUBMISSION_DETAILS_FAILURE
    }))
  }
}
