import _ from 'lodash'
import { axiosInstance } from './axiosWithAuth'
import { MEMBER_API_URL } from '../config/constants'

/**
 * Api request for fetching user profile
 * @returns {Promise<*>}
 */
export async function fetchProfile (handle) {
  const response = await axiosInstance.get(`${MEMBER_API_URL}/${handle}`)
  return _.get(response, 'data')
}
