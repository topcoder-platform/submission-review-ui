import _ from 'lodash'
import { fetchChallengeTypes, fetchChallengeDetails, fetchMemberChallenge, fetchReviewSummations } from '../services/challenges'
import {
  LOAD_CHALLENGE_DETAILS_FAILURE,
  LOAD_CHALLENGE_DETAILS_PENDING,
  LOAD_CHALLENGE_DETAILS_SUCCESS,
  LOAD_CHALLENGE_TYPES_FAILURE,
  LOAD_CHALLENGE_TYPES_PENDING,
  LOAD_CHALLENGE_TYPES_SUCCESS,
  LOAD_REVIEW_SUMMATION_PENDING,
  LOAD_REVIEW_SUMMATION_SUCCESS,
  LOAD_REVIEW_SUMMATION_FAILURE
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

      try {
        const memberChallenge = await fetchMemberChallenge(userId, challengeId)
        const roles = _.get(memberChallenge, 'userDetails.roles')
        const track = _.get(memberChallenge, 'track')
        const challengeDetails = await fetchChallengeDetails(challengeId)

        // prevent possible race condition
        if (challengeId === getLoadingId()) {
          dispatch({
            type: LOAD_CHALLENGE_DETAILS_SUCCESS,
            challengeDetails: {
              ...challengeDetails,
              track,
              roles
            }
          })
        }
      } catch (error) {
        console.error(error)
        dispatch({
          type: LOAD_CHALLENGE_DETAILS_FAILURE
        })
      }
    }
  }
}

export function loadChallengeTypes () {
  return async (dispatch, getState) => {
    // Only fetch it if it does not exist
    if (getState().challengeDetails.challengeTypes.length === 0) {
      dispatch({
        type: LOAD_CHALLENGE_TYPES_PENDING
      })

      try {
        const challengeTypes = await fetchChallengeTypes()

        dispatch({
          type: LOAD_CHALLENGE_TYPES_SUCCESS,
          challengeTypes
        })
      } catch (error) {
        console.error(error)
        dispatch({
          type: LOAD_CHALLENGE_TYPES_FAILURE
        })
      }
    }
  }
}

export function loadReviewSummation (scoreCardId, submissionId) {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_REVIEW_SUMMATION_PENDING
    })

    fetchReviewSummations(scoreCardId, submissionId).then(reviewSummations => dispatch({
      type: LOAD_REVIEW_SUMMATION_SUCCESS,
      reviewSummations
    })).catch(() => dispatch({
      type: LOAD_REVIEW_SUMMATION_FAILURE
    }))
  }
}
