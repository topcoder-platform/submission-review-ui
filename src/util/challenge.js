import _ from 'lodash'
import ChallengeTags from '../components/ChallengeDetailsComponent/ChallengeTags'
import React from 'react'
import { PHASE_IDS, PROJECT_ROLES, REVIEW_TYPES } from '../config/constants'

/**
 * Get roles from resource
 * @param resources
 * @param challengeId challenge id
 */
export const getRolesFromResource = (resources, challengeId) => {
  const foundResources = _.filter(resources.roles, { challengeId })
  let roles = []

  if (foundResources) {
    for (let res of foundResources) {
      const currentRole = _.find(resources.resourceRoles, { id: res.roleId })
      if (currentRole) {
        roles.push(currentRole.name)
      }
    }
  }

  return roles
}

/**
 * Extracts challenge prizes array from challenge data object.
 *
 * @param {Object} challenge challenge data object
 * @param {Array} challenge.prizeSets challenge prize sets
 * @returns {Array}
 */
export const getChallengePrizes = ({ prizeSets }) => {
  const placementPrizes = _.find(prizeSets, { type: 'placement' })
  return placementPrizes.prizes || []
}

/**
 * Get challenge tags
 * @param challenge
 * @param challengeTypes
 * @param resources
 */
export const getChallengeTags = (challenge, challengeTypes, resources) => {
  return (
    <ChallengeTags
      challenge={challenge}
      challengeTypes={challengeTypes}
      roles={getRolesFromResource(resources, challenge.id)}
    />
  )
}

/**
 * Check if current user has copilot role on it
 * @param challengeId challenge id
 * @param resources
 */
export const isCopilotUser = (challengeId, resources) => {
  const roles = getRolesFromResource(resources, challengeId)

  return roles.includes('Copilot')
}

/**
 * Check if current user has review role on it
 * @param challengeId challenge id
 * @param resources
 */
export const isReviewer = (challengeId, resources) => {
  const roles = getRolesFromResource(resources, challengeId)
  return _.intersectionWith(roles, [
    PROJECT_ROLES.Reviewer,
    PROJECT_ROLES.Iterative_Reviewer
  ], (act, exp) => act.toLowerCase() === exp.toLowerCase()).length > 0
}

/**
 * Get score card id based on current phase of the challenge
 * @param challenge challenge
 */
export const getScoreCardId = (challenge) => {
  switch (_.get(challenge, 'currentPhase.phaseId')) {
    case PHASE_IDS.ReviewPhase:
      return REVIEW_TYPES.Review
    case PHASE_IDS.CheckpointReviewPhase:
      return REVIEW_TYPES.CheckpointReview
    case PHASE_IDS.CheckpointScreeningPhase:
    case PHASE_IDS.ScreeningPhase:
      return REVIEW_TYPES.Screening
    case PHASE_IDS.ApprovalPhase:
      return REVIEW_TYPES.Approval
    default:
      return -1
  }
}
