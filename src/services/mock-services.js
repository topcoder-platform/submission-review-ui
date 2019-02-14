/**
 * Provides mock API calls
 */
import sampleUserResponse from '../mock-data/member'
import sampleChallengesResponse from '../mock-data/challenges'
import sampleChallengeDetailsResponse from '../mock-data/challenge-details'
import sampleDesignChallengeDetailsResponse from '../mock-data/design-challenge-details'
import sampleMMChallengeDetailsResponse from '../mock-data/mm-challenge-details'
import sampleSubmissionDetailsResponse from '../mock-data/submission-details'
import sampleChallengeTypesResponse from '../mock-data/challenge-types'

const MOCK_TIMEOUT_INTERVAL = 1000

/**
 * Mocks API call
 * @param result return value of the api call
 * @returns {Promise<*>}
 * @private
 */
async function _mockEndpoint (result) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result), MOCK_TIMEOUT_INTERVAL)
  })
}

/**
 * Mock api request for fetching user details
 * @returns {Promise<*>}
 */
export async function fetchAuthenticatedUser () {
  return _mockEndpoint(sampleUserResponse)
}

/**
 * Mock api request for fetching challenges
 * @returns {Promise<*>}
 */
export async function fetchChallenges () {
  return _mockEndpoint(sampleChallengesResponse)
}

/**
 * Mock api request for fetching challenge details
 * @returns {Promise<*>}
 */
export async function fetchChallengeDetails (challengeId) {
  if (challengeId === '30054462') {
    return _mockEndpoint(sampleMMChallengeDetailsResponse)
  }
  if (challengeId === '30034556') {
    return _mockEndpoint(sampleDesignChallengeDetailsResponse)
  }
  return _mockEndpoint(sampleChallengeDetailsResponse)
}

/**
 * Mock api request for fetching submission details
 * @returns {Promise<*>}
 */
export async function fetchSubmissionDetails () {
  return _mockEndpoint(sampleSubmissionDetailsResponse)
}

/**
 * Mock api request for fetching challenge types
 * @returns {Promise<*>}
 */
export async function fetchChallengeTypes () {
  return _mockEndpoint(sampleChallengeTypesResponse)
}
