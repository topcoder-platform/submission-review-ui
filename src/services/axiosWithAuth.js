import axios from 'axios'
import store from '../config/store'
import { getFreshToken, isTokenExpired } from 'tc-accounts'
import { ACCOUNTS_APP_LOGIN_URL } from '../config/constants'

/**
 * Create an axios instance that can make authenticated requests
 */

export const getToken = () => {
  return new Promise((resolve, reject) => {
    const token = store.getState().auth.token
    if (token && !isTokenExpired(token)) {
      console.log('Using existing token')
      return resolve(token)
    } else {
      console.log('Will get a new token')
      return getFreshToken()
        .then((token) => {
          console.log('Got a new token')
          resolve(token)
        })
        .catch((err) => {
          console.error(err)
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
  console.log('This is within the interceptor')
  return getToken()
    .then(token => {
      config.headers['Authorization'] = `Bearer ${token}`
      return config
    })
    .catch((err) => {
      console.error(err)
      const redirectBackToUrl = window.location.origin
      window.location = ACCOUNTS_APP_LOGIN_URL + '?retUrl=' + redirectBackToUrl
    })
})
