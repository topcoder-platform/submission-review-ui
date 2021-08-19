/**
 * Container to render challenge details page
 * If only challengeId is provided it fetches only challengeDetails
 * If submissionId is also provided it also fetches submissionDetails
 */
import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ScoreCardComponent from '../../components/ScoreCardComponent'
import Loader from '../../components/Loader'
import { loadChallengeDetails, loadChallengeTypes, loadReviewSummation } from '../../actions/challengeDetails'
import { loadChallengeResources, loadResourceRoles } from '../../actions/resources'
import { loadScorecards } from '../../actions/scorecards'
import { loadSubmissionDetails, postSubmissionReview } from '../../actions/submissionDetails'
import { isReviewer } from '../../util/challenge'

const parsescorecardDetails = (string) => {
  try {
    return JSON.parse(string)
  } catch (e) {
    return _.isArray(string) ? string : []
  }
}
class ScoreCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resourceLoaded: false
    }

    this.saveAndSubmit = this.saveAndSubmit.bind(this)
  }

  componentDidMount () {
    const {
      challengeId,
      scoreCardId,
      submissionId,
      loadChallengeDetails,
      loadReviewSummation,
      loadScorecards,
      loadSubmissionDetails } = this.props

    loadScorecards(scoreCardId)
    loadChallengeDetails(challengeId)
    loadReviewSummation(scoreCardId, submissionId)
    loadSubmissionDetails(submissionId)
  }

  saveAndSubmit (score, metadata) {
    const {
      postSubmissionReview,
      challengeDetails,
      auth,
      submissionId,
      scoreCardId
    } = this.props

    postSubmissionReview(
      challengeDetails.typeId,
      auth.user.userId,
      challengeDetails.legacy.reviewScorecardId || scoreCardId || 123456789, // TODO: Fix this
      submissionId,
      score,
      _.map(metadata, m => _.map(m, (entry) => {
        const formattedEntry = {}
        _.each(_.keys(entry), (key) => {
          formattedEntry[key] = _.toString(entry[key])
        })
        return formattedEntry
      }))
    )
  }

  render () {
    const {
      isLoading,
      reviewSummations,
      scoreCardId,
      challengeId,
      challengeDetails,
      challengeTypes,
      resources,
      loadChallengeResources,
      loadResourceRoles,
      scorecards,
      isScorecardLoading,
      submissionDetails
    } = this.props

    if (!isLoading && !resources.roles.length && !this.state.resourceLoaded && challengeDetails.id) {
      loadChallengeResources([challengeDetails])
      loadResourceRoles()
      this.setState({ resourceLoaded: true })
    }
    const shouldWait = challengeId.toString() !== _.get(challengeDetails, 'id', '').toString()

    if (!isLoading && isScorecardLoading === false) {
      return <Redirect to={`/challenges/${challengeId}`} />
    }

    console.log(submissionDetails)
    const shouldOpenEditMode = isReviewer(challengeId, resources) && submissionDetails.length === 0

    return (
      isScorecardLoading || isLoading || shouldWait ? <Loader />
        : <ScoreCardComponent
          savedResponses={parsescorecardDetails(_.get(submissionDetails, '[0].metadata.scorecardDetails'))}
          challenge={challengeDetails}
          challengeTypes={challengeTypes}
          resources={resources}
          reviewSummations={reviewSummations}
          scoreCardId={scoreCardId}
          challengeId={challengeId}
          scorecards={scorecards.scorecards}
          scorecardTitle={scorecards.scorecardTitle}
          scorecardDescription={scorecards.scorecardDescription}
          isLoading={scorecards.isScorecardLoading}
          saveAndSubmit={this.saveAndSubmit}
          editMode={shouldOpenEditMode}
        />
    )
  }
}

ScoreCard.defaultProps = {
  reviewSummations: [],
  challengeTypes: [],
  submissionDetails: []
}

ScoreCard.propTypes = {
  challengeDetails: PropTypes.object,
  challengeTypes: PropTypes.arrayOf(PropTypes.object),
  resources: PropTypes.object,
  reviewSummations: PropTypes.arrayOf(PropTypes.object),
  submissionDetails: PropTypes.arrayOf(PropTypes.object),
  scorecards: PropTypes.object,
  isLoading: PropTypes.bool,
  scoreCardId: PropTypes.string,
  submissionId: PropTypes.string,
  challengeId: PropTypes.string,
  loadReviewSummation: PropTypes.func,
  loadChallengeDetails: PropTypes.func,
  loadResourceRoles: PropTypes.func,
  loadChallengeResources: PropTypes.func,
  loadScorecards: PropTypes.func,
  loadSubmissionDetails: PropTypes.func,
  postSubmissionReview: PropTypes.func,
  auth: PropTypes.object,
  isScorecardLoading: PropTypes.bool
}

const mapStateToProps = ({ auth, challengeDetails, resources, scorecards, submissionDetails }) => ({
  ...challengeDetails,
  reviewSummations: challengeDetails.reviewSummations,
  resources,
  scorecards,
  auth,
  submissionDetails: submissionDetails.submissionDetails,
  isScorecardLoading: submissionDetails.isScorecardLoading
})

const mapDispatchToProps = {
  loadReviewSummation,
  loadChallengeDetails,
  loadChallengeTypes,
  loadResourceRoles,
  loadChallengeResources,
  loadScorecards,
  loadSubmissionDetails,
  postSubmissionReview
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCard)
