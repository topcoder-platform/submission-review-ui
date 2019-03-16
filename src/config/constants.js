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

export const LOAD_CHALLENGE_SUBMISSIONS_SUCCESS = 'LOAD_CHALLENGE_SUBMISSIONS_SUCCESS'
export const LOAD_CHALLENGE_SUBMISSIONS_PENDING = 'LOAD_CHALLENGE_SUBMISSIONS_PENDING'
export const LOAD_CHALLENGE_SUBMISSIONS_FAILURE = 'LOAD_CHALLENGE_SUBMISSIONS_FAILURE'

export const LOAD_CHALLENGE_TYPES_SUCCESS = 'LOAD_CHALLENGE_TYPES_SUCCESS'
export const LOAD_CHALLENGE_TYPES_PENDING = 'LOAD_CHALLENGE_TYPES_PENDING'
export const LOAD_CHALLENGE_TYPES_FAILURE = 'LOAD_CHALLENGE_TYPES_FAILURE'

export const LOAD_SUBMISSION_DETAILS_SUCCESS = 'LOAD_SUBMISSION_DETAILS_SUCCESS'
export const LOAD_SUBMISSION_DETAILS_PENDING = 'LOAD_SUBMISSION_DETAILS_PENDING'
export const LOAD_SUBMISSION_DETAILS_FAILURE = 'LOAD_SUBMISSION_DETAILS_FAILURE'

export const SAVE_AUTH_TOKEN = 'SAVE_AUTH_TOKEN'

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

// List of subtracks that should be considered as Marathon Matches
export const MARATHON_MATCH_SUBTRACKS = [
  'DEVELOP_MARATHON_MATCH'
]

export const ACCOUNTS_APP_CONNECTOR_URL = process.env.ACCOUNTS_APP_CONNECTOR_URL
export const ACCOUNTS_APP_LOGIN_URL = process.env.ACCOUNTS_APP_LOGIN_URL

export const COMMUNITY_APP_URL = process.env.COMMUNITY_APP_URL

export const CHALLENGE_API_URL = process.env.CHALLENGE_API_URL

export const SUBMISSION_REVIEW_API_URL = process.env.SUBMISSION_REVIEW_API_URL

export const MEMBER_API_URL = process.env.MEMBER_API_URL
export const MEMBER_API_V3_URL = process.env.MEMBER_API_V3_URL

export const ARENA_URL = process.env.ARENA_URL
export const DATA_SCIENCE_CHALLENGES_URL = `${COMMUNITY_APP_URL}/challenges?filter[tracks][datasci]=true`
export const DESIGN_CHALLENGES_URL = `${COMMUNITY_APP_URL}/challenges?filter[tracks][design]=true`
export const DEVELOPMENT_CHALLENGES_URL = `${COMMUNITY_APP_URL}/challenges?filter[tracks][develop]=true`

export const getTCChallengeURL = (challengeId) => `${COMMUNITY_APP_URL}/challenges/${challengeId}`
export const getTCMemberURL = (handle) => `${COMMUNITY_APP_URL}/members/${handle}`
export const downloadSubmissionURL = (submissionId, token) =>
  `${SUBMISSION_REVIEW_API_URL}/challengeSubmissions/${submissionId}/download?token=${token}`

export const SYSTEM_USERS = [
  'TC System',
  'Applications'
]
