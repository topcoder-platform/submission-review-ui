import { axiosInstance } from './axiosWithAuth'
import { V5_API_URL } from '../config/constants'

/**
 * Api request for fetching submissions for a specific challenge
 * @param challengeId
 * @returns {Promise<*>}
 */
export async function fetchChallengeSubmissions (challengeId) {
  const response = await axiosInstance.get(`${V5_API_URL}/submissions?challengeId=${challengeId}`)
  return response.data
}

/**
 * Api request to upload a submission
 * @param body the multipart/form-data body
 * @returns {Promise<*>}
 */
export async function uploadSubmission (body) {
  const response = await axiosInstance.post(`${V5_API_URL}/submissions`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}
