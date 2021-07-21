import _ from 'lodash'
import { DESIGN_SUBMISSION_SCORE_MIN, REVIEW_TYPES, PHASE_IDS } from '../config/constants'

/**
 * Computes the score for submission of a design challenge using the specified
 * index.
 *
 * @param {number} index submission index
 * @returns {number}
 */
export function computeDesignSubmissionScore (index) {
  return Math.max(100 - index * 5, DESIGN_SUBMISSION_SCORE_MIN)
}

/**
 * Get review type ID by phase ID
 * @param {String} phaseId the phase id
 */
export function getReviewTypeByPhaseId (phaseId) {
  switch (phaseId) {
    case PHASE_IDS.CheckpointScreeningPhase:
      return REVIEW_TYPES.Screening
    case PHASE_IDS.CheckpointReviewPhase:
      return REVIEW_TYPES.CheckpointReview
    case PHASE_IDS.ScreeningPhase:
      return REVIEW_TYPES.Screening
    case PHASE_IDS.ReviewPhase:
      return REVIEW_TYPES.Review
    case PHASE_IDS.FinalFixPhase:
      return REVIEW_TYPES.Review
    case PHASE_IDS.ApprovalPhase:
      return REVIEW_TYPES.Approval
    default:
      break
  }
}

/**
 * Get the review for the current phase
 * @param {Object} submission the submission
 * @param {Object} challenge the challenge
 */
export function getReviewForCurrentPhase (submission, challenge) {
  const currentPhases = _.filter(challenge.phases, p => p.isOpen)
  const reviews = []
  _.each(currentPhases, (phase) => {
    const targetTypeId = getReviewTypeByPhaseId(phase.phaseId)
    if (targetTypeId) {
      const review = _.find((submission.review || []), r => r.typeId === targetTypeId)
      if (review) {
        reviews.push(review)
      }
    }
  })
  console.log(reviews)
  return reviews
}
