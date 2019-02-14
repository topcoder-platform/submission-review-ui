/**
 * Constants used across the app
 */
// Actions
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'

export const LOAD_CHALLENGES_SUCCESS = 'LOAD_CHALLENGES_SUCCESS'
export const LOAD_CHALLENGES_PENDING = 'LOAD_CHALLENGES_PENDING'
export const LOAD_CHALLENGES_FAILURE = 'LOAD_CHALLENGES_FAILURE'

export const LOAD_CHALLENGE_DETAILS_SUCCESS = 'LOAD_CHALLENGE_DETAILS_SUCCESS'
export const LOAD_CHALLENGE_DETAILS_PENDING = 'LOAD_CHALLENGE_DETAILS_PENDING'
export const LOAD_CHALLENGE_DETAILS_FAILURE = 'LOAD_CHALLENGE_DETAILS_FAILURE'

export const LOAD_CHALLENGE_TYPES_SUCCESS = 'LOAD_CHALLENGE_TYPES_SUCCESS'
export const LOAD_CHALLENGE_TYPES_PENDING = 'LOAD_CHALLENGE_TYPES_PENDING'
export const LOAD_CHALLENGE_TYPES_FAILURE = 'LOAD_CHALLENGE_TYPES_FAILURE'

export const LOAD_SUBMISSION_DETAILS_SUCCESS = 'LOAD_SUBMISSION_DETAILS_SUCCESS'
export const LOAD_SUBMISSION_DETAILS_PENDING = 'LOAD_SUBMISSION_DETAILS_PENDING'
export const LOAD_SUBMISSION_DETAILS_FAILURE = 'LOAD_SUBMISSION_DETAILS_FAILURE'

// Name of challenge tracks
export const CHALLENGE_TRACKS = {
  DEVELOP: 'DEVELOP',
  DESIGN: 'DESIGN',
  DATA_SCIENCE: 'DATA_SCIENCE'
}

// List of challenge phase statuses
export const PHASE_STATUS = {
  CLOSED: 'Closed',
  OPEN: 'Open',
  SCHEDULED: 'Scheduled'
}

// List of review statuses
export const REVIEW_STATUS = {
  PASSED: 'Passed',
  FAILED: 'Failed'
}

// List of subtracks that should be considered as Marathon Matches
export const MARATHON_MATCH_SUBTRACKS = [
  'DEVELOP_MARATHON_MATCH'
]

export const COMMUNITY_APP_URL = process.env.COMMUNITY_APP_URL || 'https://www.topcoder-dev.com'

export const getTCChallengeURL = (challengeId) => `${COMMUNITY_APP_URL}/challenges/${challengeId}`
export const getTCMemberURL = (handle) => `${COMMUNITY_APP_URL}/members/${handle}`

export const SYSTEM_USERS = [
  'TC System',
  'Applications'
]
