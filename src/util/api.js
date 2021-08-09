import store from '../config/store'
import { getFreshToken, isTokenExpired } from 'tc-auth-lib'

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
          console.error(err)
          reject(err)
        })
    }
  })
}
