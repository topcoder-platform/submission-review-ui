import _ from 'lodash'
import { axiosInstance } from './axiosWithAuth'
import { MEMBER_API_URL } from '../config/constants'

/**
 * Api request for fetching user profile
 * @returns {Promise<*>}
 */
export async function fetchProfile (handle) {
  const response = await axiosInstance.get(`${MEMBER_API_URL}/${handle}?fields=userId,maxRating`)
  return _.get(response, 'data')
}

/**
 * API request for fetching member handle and maxRating based on user IDs
 * @param {Array} userIds
 * @returns {Promise<*>}
 */
export async function fetchMemberDetails (userIds) {
  const response = await axiosInstance.get(`${MEMBER_API_URL}?userIds=[${userIds.join(',')}]&fields=userId,handle,maxRating`)
  return _.get(response, 'data')
}
