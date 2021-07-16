import _ from 'lodash'
import legacyIdScoreCard from '../assets/scorecards/design/legacyIdFallback.json'
import { REVIEW_TYPES } from '../config/constants'

import screening from '../assets/scorecards/design/screening.json'
import checkpointReview from '../assets/scorecards/design/checkpointReview.json'
import review from '../assets/scorecards/design/review.json'
import appealsResponse from '../assets/scorecards/design/appealsResponse.json'
import iterativeReview from '../assets/scorecards/design/iterativeReview.json'
import finalFix from '../assets/scorecards/design/finalFix.json'
import approval from '../assets/scorecards/design/approval.json'

const scoreCardMap = {
  [REVIEW_TYPES.Screening]: screening,
  [REVIEW_TYPES.CheckpointReview]: checkpointReview,
  [REVIEW_TYPES.Review]: review,
  [REVIEW_TYPES.AppealsResponse]: appealsResponse,
  [REVIEW_TYPES.IterativeReview]: iterativeReview,
  [REVIEW_TYPES.FinalFix]: finalFix,
  [REVIEW_TYPES.Approval]: approval
}

/**
 * Mock Api for fetching scorecard detail
 * @returns {Promise<*>}
 */
export async function fetchScorecard (scoreCardId) {
  // Return legacyId scorecard as fallback for legacy ids e.g. 30001850
  return _.get(scoreCardMap, scoreCardId, legacyIdScoreCard)
}
