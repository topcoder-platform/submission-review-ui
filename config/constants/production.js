module.exports = {
  ACCOUNTS_APP_CONNECTOR_URL: process.env.ACCOUNTS_APP_CONNECTOR_URL || 'https://accounts-auth0.topcoder.com',
  ACCOUNTS_APP_LOGIN_URL: process.env.ACCOUNTS_APP_LOGIN_URL || 'https://accounts-auth0.topcoder.com',
  COMMUNITY_APP_URL: process.env.COMMUNITY_APP_URL || 'https://www.topcoder.com',
  MEMBER_API_URL: process.env.MEMBER_API_URL || 'https://api.topcoder.com/v5/members',
  ARENA_URL: process.env.ARENA_URL || 'https://arena.topcoder.com',
  DEV_APP_URL: process.env.DEV_APP_URL || 'https://submission-review.topcoder.com',
  V5_API_URL: process.env.V5_API_URL || 'https://api.topcoder.com/v5',
  SUBMISSION_REVIEW_API_URL: process.env.SUBMISSION_REVIEW_API_URL || 'https://submission-review-api.topcoder.com'
}
