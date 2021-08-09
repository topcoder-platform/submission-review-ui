/**
 * Container to render challenge details page
 * If only challengeId is provided it fetches only challengeDetails
 * If submissionId is also provided it also fetches submissionDetails
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { get } from 'lodash'
import ChallengeDetailsComponent from '../../components/ChallengeDetailsComponent'
import { loadChallengeDetails, loadChallengeTypes, loadReviewSummation } from '../../actions/challengeDetails'
import { loadSubmissionDetails, loadSubmissionArtifacts, switchTab, loadReviewTypes } from '../../actions/submissionDetails'
import { loadChallengeSubmissions } from '../../actions/challengeSubmissions'
import { loadChallengeResources, loadResourceRoles } from '../../actions/resources'

import Loader from '../../components/Loader'

class ChallengeDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resourceLoaded: false
    }
  }

  componentDidMount () {
    const {
      loadChallengeDetails,
      loadChallengeTypes,
      loadSubmissionDetails,
      challengeId,
      submissionId,
      loadSubmissionArtifacts,
      loadChallengeSubmissions,
      loadReviewTypes,
      loadReviewSummation,
      submissionDetails
    } = this.props

    loadChallengeDetails(challengeId)
    // Load submission details if on submission details page
    if (submissionId) {
      loadSubmissionDetails(submissionId)
      loadSubmissionArtifacts(submissionId)
      loadReviewTypes()

      if (submissionDetails) {
        loadReviewSummation(submissionDetails.scoreCardId, submissionId)
      }
    } else {
      loadChallengeSubmissions(challengeId)
    }
    loadChallengeTypes()
  }

  componentDidUpdate (prevProps, prevState) {
    const {
      loadSubmissionDetails,
      challengeSubmissionsChallengeId,
      loadSubmissionArtifacts,
      loadReviewTypes,
      challengeId,
      submissionId,
      reviewTypes,
      loadReviewSummation,
      submissionDetails
    } = this.props

    // If navigated to or from the submission details page
    if (prevProps.submissionId !== submissionId) {
      if (submissionId) {
        loadSubmissionDetails(submissionId)
        loadChallengeSubmissions(challengeId)
        loadSubmissionArtifacts(submissionId)
        if (!reviewTypes.length) {
          loadReviewTypes()
        }
      } else {
        // if challenge submissions not loaded already
        if (challengeId !== challengeSubmissionsChallengeId) {
          loadChallengeSubmissions(challengeId)
        }
      }
    }

    if (prevProps.submissionDetails !== submissionDetails && submissionDetails.length && submissionDetails[0].scoreCardId) {
      loadReviewSummation(submissionDetails[0].scoreCardId, submissionId)
    }
  }

  render () {
    const {
      challengeDetails,
      invalidChallenge,
      challengeId,
      challengeSubmissions,
      challengeTypes,
      submissionDetails,
      submissionId,
      isLoading,
      isSubmissionLoading,
      isChallengeSubmissionsLoading,
      isArtifactsLoading,
      submissionArtifacts,
      currentTab,
      switchTab,
      resources,
      loadChallengeResources,
      loadResourceRoles,
      reviewTypes,
      reviewSummations
    } = this.props

    if (!isLoading && !resources.roles.length && !this.state.resourceLoaded) {
      loadChallengeResources([challengeDetails])
      loadResourceRoles()
      this.setState({ resourceLoaded: true })
    }

    if (!isLoading && invalidChallenge) return <Redirect to='/' />

    const shouldWait = challengeId.toString() !== get(challengeDetails, 'id', '').toString()

    return isLoading || shouldWait ? <Loader /> : (
      <ChallengeDetailsComponent
        challenge={challengeDetails}
        challengeTypes={challengeTypes}
        submissionId={submissionId}
        submissionDetails={submissionDetails}
        isSubmissionLoading={isSubmissionLoading}
        challengeSubmissions={challengeSubmissions}
        isChallengeSubmissionsLoading={isChallengeSubmissionsLoading}
        isArtifactsLoading={isArtifactsLoading}
        submissionArtifacts={submissionArtifacts}
        currentTab={currentTab}
        switchTab={switchTab}
        resources={resources}
        reviewTypes={reviewTypes}
        reviewSummations={reviewSummations}
      />
    )
  }
}

ChallengeDetails.defaultProps = {
  reviewTypes: [],
  reviewSummations: []
}

ChallengeDetails.propTypes = {
  challengeDetails: PropTypes.object,
  challengeTypes: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  loadChallengeDetails: PropTypes.func,
  loadChallengeTypes: PropTypes.func,
  loadSubmissionDetails: PropTypes.func,
  loadSubmissionArtifacts: PropTypes.func,
  switchTab: PropTypes.func,
  challengeId: PropTypes.string,
  submissionId: PropTypes.string,
  challengeSubmissionsChallengeId: PropTypes.string,
  isChallengeSubmissionsLoading: PropTypes.bool,
  challengeSubmissions: PropTypes.arrayOf(PropTypes.object),
  isSubmissionLoading: PropTypes.bool,
  submissionDetails: PropTypes.arrayOf(PropTypes.object),
  isArtifactsLoading: PropTypes.bool,
  submissionArtifacts: PropTypes.object,
  currentTab: PropTypes.string,
  invalidChallenge: PropTypes.bool,
  resources: PropTypes.object,
  loadChallengeResources: PropTypes.func,
  loadResourceRoles: PropTypes.func,
  loadChallengeSubmissions: PropTypes.func,
  loadReviewTypes: PropTypes.func,
  reviewTypes: PropTypes.arrayOf(PropTypes.object),
  reviewSummations: PropTypes.arrayOf(PropTypes.object),
  loadReviewSummation: PropTypes.func
}

const mapStateToProps = ({ auth, challengeDetails, challengeSubmissions, submissionDetails, resources }) => ({
  ...challengeDetails,
  challengeSubmissionsChallengeId: challengeSubmissions.challengeId,
  challengeSubmissions: challengeSubmissions.challengeSubmissions,
  isChallengeSubmissionsLoading: challengeSubmissions.isLoading,
  submissionDetails: submissionDetails.submissionDetails,
  isSubmissionLoading: submissionDetails.isLoading,
  submissionArtifacts: submissionDetails.submissionArtifacts,
  isArtifactsLoading: submissionDetails.isLoading,
  currentTab: submissionDetails.currentTab,
  reviewTypes: challengeDetails.reviewTypes,
  reviewSummations: challengeDetails.reviewSummations,
  resources
})

const mapDispatchToProps = {
  loadChallengeDetails,
  loadChallengeTypes,
  loadChallengeSubmissions,
  loadSubmissionDetails,
  loadSubmissionArtifacts,
  switchTab,
  loadChallengeResources,
  loadResourceRoles,
  loadReviewTypes,
  loadReviewSummation
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDetails)
