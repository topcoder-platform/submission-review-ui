import _ from 'lodash'
import {
  fetchSubmissionReviews,
  fetchSubmissionArtifacts,
  fetchReviewTypes,
  sendSubmissionReview } from '../services/submissionReview'
import {
  LOAD_SUBMISSION_DETAILS_FAILURE,
  LOAD_SUBMISSION_DETAILS_PENDING,
  LOAD_SUBMISSION_DETAILS_SUCCESS,
  LOAD_SUBMISSION_ARTIFACTS_FAILURE,
  LOAD_SUBMISSION_ARTIFACTS_PENDING,
  LOAD_SUBMISSION_ARTIFACTS_SUCCESS,
  LOAD_REVIEW_TYPES_PENDING,
  LOAD_REVIEW_TYPES_SUCCESS,
  LOAD_REVIEW_TYPES_FAILURE,
  POST_SUBMISSION_REVIEW_PENDING,
  POST_SUBMISSION_REVIEW_SUCCESS,
  POST_SUBMISSION_REVIEW_FAILURE,
  SWITCH_TAB,
  SUBMISSION_DETAILS_TABS
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
      dispatch({
        type: SWITCH_TAB,
        tab: SUBMISSION_DETAILS_TABS.REVIEW_SUMMARY
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

export function postSubmissionReview (
  typeId,
  reviewerId,
  scoreCardId,
  submissionId,
  score,
  metadata
) {
  return async (dispatch, getState) => {
    dispatch({
      type: POST_SUBMISSION_REVIEW_PENDING
    })

    try {
      const data = await sendSubmissionReview({
        typeId: 'd6d31f34-8ee5-4589-ae65-45652fcc01a6',
        reviewerId,
        scoreCardId,
        submissionId,
        score,
        metadata: { metadata }
      })

      dispatch({
        type: POST_SUBMISSION_REVIEW_SUCCESS
      })

      return data
    } catch (error) {
      console.error(error)
      dispatch({
        type: POST_SUBMISSION_REVIEW_FAILURE
      })
    }
  }
}

export function loadSubmissionArtifacts (submissionId) {
  return async (dispatch, getState) => {
    const getLoadingId = () => _.get(getState(), 'submissionDetails.loadingSubmissionIdOfArtifacts')

    // if it's not loading already
    if (submissionId !== getLoadingId()) {
      dispatch({
        type: LOAD_SUBMISSION_ARTIFACTS_PENDING,
        submissionId
      })

      try {
        const submissionArtifacts = await fetchSubmissionArtifacts(submissionId)

        // prevent possible race condition
        if (submissionId === getLoadingId()) {
          dispatch({
            type: LOAD_SUBMISSION_ARTIFACTS_SUCCESS,
            submissionArtifacts
          })
        }
      } catch (error) {
        console.error(error)
        dispatch({
          type: LOAD_SUBMISSION_ARTIFACTS_FAILURE
        })
      }
    }
  }
}

export function loadReviewTypes () {
  return async (dispatch, getState) => {
    dispatch({ type: LOAD_REVIEW_TYPES_PENDING })

    fetchReviewTypes().then(reviewTypes => dispatch({
      type: LOAD_REVIEW_TYPES_SUCCESS,
      reviewTypes
    })).catch(() => dispatch({
      type: LOAD_REVIEW_TYPES_FAILURE
    }))
  }
}

export function switchTab (tab) {
  return (dispatch) => {
    dispatch({
      type: SWITCH_TAB,
      tab
    })
  }
}
