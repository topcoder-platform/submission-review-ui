/**
 * Component to render challenge details and submission details pages
 */
import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import PageHeader from '../PageHeader'
import styles from './ChallengeDetailsComponent.module.scss'
import ChallengeInfo from './ChallengeInfo'
import { MARATHON_MATCH_SUBTRACKS, PHASE_NAME } from '../../config/constants'
import { getChallengeTags } from '../../util/challenge'
import List from './List'
import SubmissionDetails from './SubmissionDetails'
import { Redirect } from 'react-router-dom'

const isMarathonMatch = c => (MARATHON_MATCH_SUBTRACKS.includes(c.subTrack))

const ChallengeDetailsComponent = ({
  challenge,
  challengeTypes,
  submissionId,
  challengeSubmissions,
  isChallengeSubmissionsLoading,
  submissionDetails,
  isSubmissionLoading,
  isArtifactsLoading,
  submissionArtifacts,
  currentTab,
  switchTab,
  resources,
  reviewTypes,
  reviewSummations,
  memberId }) => {
  const { id, name, legacy, phases } = challenge
  const isOnSubmissionDetailsPage = !!submissionId
  const isDesignChallenge = legacy.track === 'DESIGN' || challenge.track === 'Design'
  const isPureV5Challenge = legacy.pureV5 === true
  const isPureV5Review = isPureV5Challenge && phases.some(
    ({ isOpen, name }) => isOpen && name === PHASE_NAME.REVIEW
  )
  if (challengeSubmissions.length === 0 && submissionId) {
    const submissionIds = _.map(challengeSubmissions, s => (s.submissions[0].id))
    if (!_.includes(submissionIds, submissionId)) return <Redirect to={`/challenges/${id}`} />
  }
  return (
    <div>
      <Helmet title={name || 'Challenge Details'} />
      <PageHeader title={name} tags={getChallengeTags(challenge, challengeTypes, resources, memberId)} />
      <div className={styles.challenges}>
        <ChallengeInfo challenge={challenge} />
        {!isOnSubmissionDetailsPage &&
          <List
            challenge={challenge}
            isMarathonMatch={isMarathonMatch(challenge)}
            isChallengeSubmissionsLoading={isChallengeSubmissionsLoading}
            challengeSubmissions={challengeSubmissions}
            challengeId={id}
            isDesignChallenge={isDesignChallenge}
            isPureV5Review={isPureV5Review}
            resources={resources}
            memberId={memberId}
          />}
        {isOnSubmissionDetailsPage &&
          <SubmissionDetails
            submissionId={submissionId}
            isSubmissionLoading={isSubmissionLoading}
            submissionDetails={submissionDetails}
            challengeId={id}
            isArtifactsLoading={isArtifactsLoading}
            submissionArtifacts={submissionArtifacts}
            currentTab={currentTab}
            switchTab={switchTab}
            reviewTypes={reviewTypes}
            reviewSummations={reviewSummations}
          />}
      </div>
    </div>
  )
}

ChallengeDetailsComponent.propTypes = {
  challenge: PropTypes.object,
  challengeTypes: PropTypes.arrayOf(PropTypes.object),
  submissionId: PropTypes.string,
  submissionDetails: PropTypes.arrayOf(PropTypes.object),
  isSubmissionLoading: PropTypes.bool,
  challengeSubmissions: PropTypes.arrayOf(PropTypes.object),
  isChallengeSubmissionsLoading: PropTypes.bool,
  isArtifactsLoading: PropTypes.bool,
  submissionArtifacts: PropTypes.object,
  currentTab: PropTypes.string,
  switchTab: PropTypes.func,
  resources: PropTypes.object,
  reviewTypes: PropTypes.arrayOf(PropTypes.object),
  reviewSummations: PropTypes.arrayOf(PropTypes.object),
  memberId: PropTypes.string.isRequired
}

ChallengeDetailsComponent.defaultProps = {
  challenge: null,
  challengeTypes: [],
  resources: {},
  reviewTypes: [],
  reviewSummations: []
}

export default ChallengeDetailsComponent
