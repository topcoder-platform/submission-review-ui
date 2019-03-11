import _ from 'lodash'
import { fetchSubmissionReviews } from '../services/submissionReview'
import {
  LOAD_SUBMISSION_DETAILS_FAILURE,
  LOAD_SUBMISSION_DETAILS_PENDING,
  LOAD_SUBMISSION_DETAILS_SUCCESS
} from '../config/constants'

export function loadSubmissionDetails (submissionId) {
  return async (dispatch, getState) => {
    const getLoadingId = () => _.get(getState(), 'submissionDetails.loadingId')

    // if it's not loading already
    if (submissionId !== getLoadingId()) {
      dispatch({
        type: LOAD_SUBMISSION_DETAILS_PENDING,
        submissionId
      })

      try {
        const submissionDetails = await fetchSubmissionReviews(submissionId)

        // prevent possible race condition
        if (submissionId === getLoadingId()) {
          dispatch({
            type: LOAD_SUBMISSION_DETAILS_SUCCESS,
            submissionDetails
          })
        }
      } catch (error) {
        console.error(error)
        dispatch({
          type: LOAD_SUBMISSION_DETAILS_FAILURE
        })
      }
    }
  }
}
