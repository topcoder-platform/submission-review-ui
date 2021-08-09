/**
 * Reducer to process actions related to challenge resources
 */
import {
  LOAD_SCORECARDS_FAILURE,
  LOAD_SCORECARDS_PENDING,
  LOAD_SCORECARDS_SUCCESS
} from '../config/constants'

const initialState = {
  isScorecardLoading: true,
  scorecards: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_SCORECARDS_PENDING:
      return { ...state, isScorecardLoading: true }
    case LOAD_SCORECARDS_FAILURE:
      return { ...state, isScorecardLoading: false }
    case LOAD_SCORECARDS_SUCCESS:
      return {
        ...state,
        scorecards: action.scorecards.data,
        scorecardTitle: action.scorecards.title,
        scorecardDescription: action.scorecards.description,
        isScorecardLoading: false }
    default:
      return state
  }
}
