import scorecards from '../assets/scorecards/design/screening.json'

/**
 * Mock Api for fetching scorecard detail
 * @returns {Promise<*>}
 */
export async function fetchScorecard () {
  return scorecards
}
