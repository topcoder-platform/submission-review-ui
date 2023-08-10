import _ from 'lodash'
import { axiosInstance } from './axiosWithAuth'
import { V5_API_URL } from '../config/constants'

/**
 * Api request for fetching member's active challenges
 * @returns {Promise<*>}
 */
export async function fetchMemberChallenges (userId) {
  const response = await axiosInstance.get(`${V5_API_URL}/challenges?memberId=${userId}&status=ACTIVE`)
  return _.get(response, 'data')
}

/**
 * Api request for fetching challenge details
 * @param challengeId
 * @returns {Promise<*>}
 */
export async function fetchChallengeDetails (challengeId) {
  const response = await axiosInstance.get(`${V5_API_URL}/challenges/${challengeId}`)
  return _.get(response, 'data')
}

/**
 * Api request for fetching member's challenge (it includes member roles)
 * @param {String} userId
 * @param challengeId
 * @returns {Promise<*>}
 */
export async function fetchMemberResourcesOnChallenge (userId, challengeId) {
  const response = await axiosInstance.get(`${V5_API_URL}/resources?memberId=${userId}&challengeId=${challengeId}`)
  return _.get(response, 'data')
}

/**
 * Fetch member resource roles
 * @returns {Promise<*>}
 */
export async function fetchMemberResourceRoles () {
  const response = await axiosInstance.get(`${V5_API_URL}/resource-roles`)
  return _.get(response, 'data')
}
