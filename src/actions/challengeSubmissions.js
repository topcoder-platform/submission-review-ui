import _ from 'lodash'
import {
  fetchChallengeSubmissions,
  sendSubmissionReview
} from '../services/submissionReview'
import {
  CHALLENGE_TRACKS,
  CREATE_REVIEW_RECORDS_ERROR,
  CREATE_REVIEW_RECORDS_PENDING,
  CREATE_REVIEW_RECORDS_SUCCESS,
  LOAD_CHALLENGE_SUBMISSIONS_FAILURE,
  LOAD_CHALLENGE_SUBMISSIONS_PENDING,
  LOAD_CHALLENGE_SUBMISSIONS_SUCCESS,
  REVIEW_TYPE_ID
} from '../config/constants'
import { computeDesignSubmissionScore } from '../util/submission'

/**
 * Load challenge submissions
 * @param {String} challengeId
 */
export function loadChallengeSubmissions (challengeId) {
  return async (dispatch, getState) => {
    const getLoadingId = () => _.get(getState(), 'challengeSubmissions.loadingId')
    // if it's not loading already
    if (challengeId !== getLoadingId()) {
      dispatch({
        type: LOAD_CHALLENGE_SUBMISSIONS_PENDING,
        challengeId
      })

      try {
        const challengeSubmissions = await fetchChallengeSubmissions(challengeId)
        // prevent possible race condition
        if (challengeId === getLoadingId()) {
          dispatch({
            type: LOAD_CHALLENGE_SUBMISSIONS_SUCCESS,
            challengeSubmissions
          })
        }
      } catch (error) {
        console.error(error)
        dispatch({
          type: LOAD_CHALLENGE_SUBMISSIONS_FAILURE
        })
      }
    }
  }
}

export const createReviewRecords = () =>
  async (dispatch, getState) => {
    const state = getState()
    if (state.challengeSubmissions.isSubmittingReviews) {
      return
    }
    dispatch({ type: CREATE_REVIEW_RECORDS_PENDING })
    const promises = []
    const reviewerId = _.toString(state.auth.user.userId) // is this the correct reviewerId?
    const challengeTrack = state.challengeDetails.challengeDetails.track
    const submissions = state.challengeSubmissions.challengeSubmissions
    for (let i = 0, len = submissions.length; i < len; i++) {
      let { id, review } = submissions[i]
      let hasReview = review && review[0]
      if (hasReview) {
        // Checking if there's already a review for this submission.
        let hasSubmittedReview = false
        for (let rev of review) {
          if (rev.typeId === REVIEW_TYPE_ID.REVIEW) {
            hasSubmittedReview = true
            break
          }
        }
        if (hasSubmittedReview) {
          // No reason to create another review record for this submission.
          continue
        }
      }
      let score = 0
      if (challengeTrack === CHALLENGE_TRACKS.DESIGN) {
        score = computeDesignSubmissionScore(i)
      } else if (hasReview) {
        // Is this the correct way to obtain the score for non-design challenge
        // submissions?
        // Does the review[0] always contain the latest review?
        score = review[0].score || 0
      }
      promises.push(sendSubmissionReview({
        reviewerId,
        score,
        // Where to get the scoreCardId if there're no previous reviews?
        scoreCardId: (hasReview && review[0].scoreCardId) || 0,
        submissionId: id,
        typeId: REVIEW_TYPE_ID.REVIEW
      }).then((result) => {
        results.set(result.submissionId, result)
      }).catch((error) => {
        errors.set(id, error)
        // How to notify the user about the error?
        console.error(error)
      }))
    }
    let errors = new Map()
    let results = new Map()
    try {
      await Promise.all(promises)
    } catch (error) {
      // This branch should be unreachable because all promise rejections are
      // handled in the code above.
      console.error(error)
      return
    }
    // What to do if some reviews were successfully created and others were not?
    if (errors.size) {
      dispatch({ type: CREATE_REVIEW_RECORDS_ERROR, errors })
    } else {
      dispatch({ type: CREATE_REVIEW_RECORDS_SUCCESS, results })
    }
  }
