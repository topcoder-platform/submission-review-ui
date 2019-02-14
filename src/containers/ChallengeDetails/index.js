/**
 * Container to render challenge details page
 * If only challengeId is provided it fetches only challengeDetails
 * If submissionId is also provided it also fetches submissionDetails
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ChallengeDetailsComponent from '../../components/ChallengeDetailsComponent'
import { loadChallengeDetails, loadChallengeTypes } from '../../actions/challengeDetails'
import { loadSubmissionDetails } from '../../actions/submissionDetails'

import Loader from '../../components/Loader'

class ChallengeDetails extends Component {
  componentDidMount () {
    const { loadChallengeDetails, loadChallengeTypes, loadSubmissionDetails, challengeId, submissionId } = this.props
    loadChallengeDetails(challengeId)
    // Load submission details if on submission details page
    if (submissionId) {
      loadSubmissionDetails(submissionId)
    }
    loadChallengeTypes()
  }

  componentDidUpdate (prevProps, prevState) {
    const { loadSubmissionDetails, submissionId } = this.props
    // If navigated to submission details page load submission details
    if (submissionId && (!prevProps.submissionId || submissionId !== prevProps.submissionId)) {
      loadSubmissionDetails(submissionId)
    }
  }

  render () {
    const { challengeDetails, challengeTypes, submissionDetails, submissionId, isLoading, isSubmissionLoading } = this.props
    return isLoading ? <Loader /> : (
      <ChallengeDetailsComponent
        challenge={challengeDetails}
        challengeTypes={challengeTypes}
        submissionId={submissionId}
        submissionDetails={submissionDetails}
        isSubmissionLoading={isSubmissionLoading}
      />
    )
  }
}

ChallengeDetails.propTypes = {
  challengeDetails: PropTypes.object,
  challengeTypes: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  loadChallengeDetails: PropTypes.func,
  loadChallengeTypes: PropTypes.func,
  loadSubmissionDetails: PropTypes.func,
  challengeId: PropTypes.string,
  submissionId: PropTypes.string,
  isSubmissionLoading: PropTypes.bool,
  submissionDetails: PropTypes.object
}

const mapStateToProps = ({ challengeDetails, submissionDetails }) => ({
  ...challengeDetails,
  submissionDetails: submissionDetails.submissionDetails,
  isSubmissionLoading: submissionDetails.isLoading
})

const mapDispatchToProps = {
  loadChallengeDetails,
  loadChallengeTypes,
  loadSubmissionDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDetails)
