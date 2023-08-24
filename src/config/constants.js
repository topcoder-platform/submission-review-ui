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

export const LOAD_SUBMISSION_DETAILS_SUCCESS = 'LOAD_SUBMISSION_DETAILS_SUCCESS'
export const LOAD_SUBMISSION_DETAILS_PENDING = 'LOAD_SUBMISSION_DETAILS_PENDING'
export const LOAD_SUBMISSION_DETAILS_FAILURE = 'LOAD_SUBMISSION_DETAILS_FAILURE'

export const LOAD_SUBMISSION_ARTIFACTS_SUCCESS = 'LOAD_SUBMISSION_ARTIFACTS_SUCCESS'
export const LOAD_SUBMISSION_ARTIFACTS_PENDING = 'LOAD_SUBMISSION_ARTIFACTS_PENDING'
export const LOAD_SUBMISSION_ARTIFACTS_FAILURE = 'LOAD_SUBMISSION_ARTIFACTS_FAILURE'

export const LOAD_RESOURCE_ROLES_SUCCESS = 'LOAD_RESOURCE_ROLES_SUCCESS'
export const LOAD_RESOURCE_ROLES_PENDING = 'LOAD_RESOURCE_ROLES_PENDING'
export const LOAD_RESOURCE_ROLES_FAILURE = 'LOAD_RESOURCE_ROLES_FAILURE'

export const SWITCH_TAB = 'SWITCH_TAB'

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

export const SUBMISSION_DETAILS_TABS = {
  REVIEW_SUMMARY: 'Review Summary',
  ARTIFACTS: 'Artifacts'
}

export const ACCOUNTS_APP_CONNECTOR_URL = process.env.ACCOUNTS_APP_CONNECTOR_URL
export const ACCOUNTS_APP_LOGIN_URL = process.env.ACCOUNTS_APP_LOGIN_URL

export const COMMUNITY_APP_URL = process.env.COMMUNITY_APP_URL

export const V5_API_URL = process.env.V5_API_URL

export const SUBMISSION_REVIEW_API_URL = process.env.SUBMISSION_REVIEW_API_URL

export const MEMBER_API_URL = process.env.MEMBER_API_URL

export const ARENA_URL = process.env.ARENA_URL
export const DATA_SCIENCE_CHALLENGES_URL = `${COMMUNITY_APP_URL}/challenges?tracks[DS]=true`
export const DESIGN_CHALLENGES_URL = `${COMMUNITY_APP_URL}/challenges?tracks[Des]=true`
export const DEVELOPMENT_CHALLENGES_URL = `${COMMUNITY_APP_URL}/challenges?tracks[Dev]=true`

export const getTCChallengeURL = (challengeId) => `${COMMUNITY_APP_URL}/challenges/${challengeId}`
export const getTCMemberURL = (handle) => `${COMMUNITY_APP_URL}/members/${handle}`
export const downloadSubmissionURL = (submissionId, token) =>
  `${SUBMISSION_REVIEW_API_URL}/challengeSubmissions/${submissionId}/download?token=${token}`
export const downloadSubmissionArtifactURL = (submissionId, artifactId, token) =>
  `${SUBMISSION_REVIEW_API_URL}/challengeSubmissions/${submissionId}/artifacts/${artifactId}/download?token=${token}`

export const SYSTEM_USERS = [
  'TC System',
  'Applications'
]
