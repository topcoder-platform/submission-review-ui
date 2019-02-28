import _ from 'lodash'
import { axiosInstance } from './axiosWithAuth'
import { MEMBER_API_URL } from '../config/constants'

/**
 * Api request for fetching member's active challenges
 * @returns {Promise<*>}
 */
export async function fetchMemberChallenges (handle) {
  const response = await axiosInstance.get(`${MEMBER_API_URL}/${handle}/challenges?filter=status=ACTIVE`)
  return _.get(response, 'data.result.content')
}
