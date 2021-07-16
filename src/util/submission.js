import { DESIGN_SUBMISSION_SCORE_MIN } from '../config/constants'

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
