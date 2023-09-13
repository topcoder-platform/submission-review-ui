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
import { loadChallengeDetails } from '../../actions/challengeDetails'
import { loadSubmissionDetails, loadSubmissionArtifacts, switchTab } from '../../actions/submissionDetails'
import { loadChallengeSubmissions, loadSubmitters } from '../../actions/challengeSubmissions'

import Loader from '../../components/Loader'
import submissionDetails from '../../reducers/submissionDetails'

class ChallengeDetails extends Component {
  componentDidMount () {
    const {
      loadChallengeDetails,
      loadChallengeSubmissions,
      loadSubmissionDetails,
      challengeId,
      submissionId,
      loadSubmissionArtifacts
    } = this.props

    loadChallengeDetails(challengeId)
    // Load submission details if on submission details page
    if (submissionId) {
      loadSubmissionDetails(submissionId)
      loadSubmissionArtifacts(submissionId)
    } else {
      loadChallengeSubmissions(challengeId)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const {
      loadSubmissionDetails,
      challengeSubmissionsChallengeId,
      loadChallengeSubmissions,
      loadSubmissionArtifacts,
      challengeId,
      submissionId,
      loadSubmitters
    } = this.props

    // If navigated to or from the submission details page
    if (prevProps.submissionId !== submissionId) {
      if (submissionId) {
        loadSubmissionDetails(submissionId)
        loadChallengeSubmissions(challengeId)
        loadSubmissionArtifacts(submissionId)
      } else {
        // if challenge submissions not loaded already
        if (challengeId !== challengeSubmissionsChallengeId) {
          loadChallengeSubmissions(challengeId)
        }
      }
    }
    if ((submissionDetails || challengeSubmissions.length > 0) && (!submitters || submitters.length === 0)) {
      loadSubmitters(submissionId ? submissionDetails.memberId : challengeSubmissions.map(s => s.memberId))
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
      submitters
    } = this.props

    if (!isLoading && invalidChallenge) return <Redirect to='/' />

    const shouldWait = challengeId.toString() !== get(challengeDetails, 'id', '').toString()

    return isLoading || shouldWait ? <Loader /> : (
      <ChallengeDetailsComponent
        submitters={submitters}
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
      />
    )
  }
}

ChallengeDetails.propTypes = {
  challengeDetails: PropTypes.object,
  challengeTypes: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  loadChallengeDetails: PropTypes.func,
  loadChallengeSubmissions: PropTypes.func,
  loadSubmitters: PropTypes.func,
  loadSubmissionDetails: PropTypes.func,
  loadSubmissionArtifacts: PropTypes.func,
  switchTab: PropTypes.func,
  challengeId: PropTypes.string,
  submissionId: PropTypes.string,
  challengeSubmissionsChallengeId: PropTypes.string,
  isChallengeSubmissionsLoading: PropTypes.bool,
  challengeSubmissions: PropTypes.arrayOf(PropTypes.object),
  submitters: PropTypes.arrayOf(PropTypes.object),
  isSubmissionLoading: PropTypes.bool,
  submissionDetails: PropTypes.object,
  isArtifactsLoading: PropTypes.bool,
  submissionArtifacts: PropTypes.object,
  currentTab: PropTypes.string,
  invalidChallenge: PropTypes.bool
}

const mapStateToProps = ({ auth, challengeDetails, challengeSubmissions, submissionDetails }) => ({
  ...challengeDetails,
  challengeSubmissionsChallengeId: challengeSubmissions.challengeId,
  challengeSubmissions: challengeSubmissions.challengeSubmissions,
  submitters: challengeSubmissions.submitters,
  isChallengeSubmissionsLoading: challengeSubmissions.isLoading,
  submissionDetails: submissionDetails.submissionDetails,
  isSubmissionLoading: submissionDetails.isLoading,
  submissionArtifacts: submissionDetails.submissionArtifacts,
  isArtifactsLoading: submissionDetails.isLoading,
  currentTab: submissionDetails.currentTab
})

const mapDispatchToProps = {
  loadChallengeDetails,
  loadChallengeSubmissions,
  loadSubmitters,
  loadSubmissionDetails,
  loadSubmissionArtifacts,
  switchTab
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDetails)
