/**
 * Container to render challenge details page
 * If only challengeId is provided it fetches only challengeDetails
 * If submissionId is also provided it also fetches submissionDetails
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ScoreCardComponent from '../../components/ScoreCardComponent'
import Loader from '../../components/Loader'
import { loadReviewSummation } from '../../actions/challengeDetails'

class ScoreCard extends Component {
  componentDidMount () {
    const { loadReviewSummation, scoreCardId, submissionId } = this.props

    loadReviewSummation(scoreCardId, submissionId)
  }

  render () {
    const { isLoading, reviewSummations, scoreCardId, challengeId } = this.props

    return (
      isLoading ? <Loader /> : <ScoreCardComponent reviewSummations={reviewSummations} scoreCardId={scoreCardId} challengeId={challengeId} />
    )
  }
}

ScoreCard.defaultProps = {
  reviewSummations: []
}

ScoreCard.propTypes = {
  reviewSummations: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  loadReviewSummation: PropTypes.func,
  scoreCardId: PropTypes.string,
  submissionId: PropTypes.string,
  challengeId: PropTypes.string
}

const mapStateToProps = (state) => ({
  ...state,
  reviewSummations: state.challengeDetails.reviewSummations,
  challengeDetails: state.challengeDetails
})

const mapDispatchToProps = {
  loadReviewSummation
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCard)
