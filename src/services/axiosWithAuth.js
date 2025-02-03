import axios from 'axios'
import store from '../config/store'
import { getFreshToken, isTokenExpired } from 'tc-auth-lib'
import { ACCOUNTS_APP_LOGIN_URL } from '../config/constants'

/**
 * Create an axios instance that can make authenticated requests
 */

export const getToken = () => {
  return new Promise((resolve, reject) => {
    const token = store.getState().auth.token
    if (token && !isTokenExpired(token)) {
      return resolve(token)
    } else {
      return getFreshToken()
        .then((token) => {
          resolve(token)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 120000
})

// request interceptor to pass auth token
axiosInstance.interceptors.request.use(config => {
  return getToken()
    .then(token => {
      config.headers['Authorization'] = `Bearer ${token}`
      return config
    })
    .catch((err) => {
      const redirectBackToUrl = window.location.origin
      window.location = ACCOUNTS_APP_LOGIN_URL + '?retUrl=' + redirectBackToUrl
    })
})
