/**
 * Component to render challenge details and submission details pages
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import PageHeader from '../PageHeader'
import styles from './ChallengeDetailsComponent.module.scss'
import ChallengeTags from './ChallengeTags'
import ChallengeInfo from './ChallengeInfo'
import { MARATHON_MATCH_SUBTRACKS } from '../../config/constants'
import List from './List'
import SubmissionDetails from './SubmissionDetails'

const isMarathonMatch = c => (MARATHON_MATCH_SUBTRACKS.includes(c.subTrack))

const ChallengeDetailsComponent = ({
  challenge,
  challengeTypes,
  submissionId,
  challengeSubmissions,
  isChallengeSubmissionsLoading,
  submissionDetails,
  isSubmissionLoading,
  userToken }) => {
  const { challengeId, challengeTitle } = challenge
  const challengeTags = <ChallengeTags challenge={challenge} challengeTypes={challengeTypes} />
  const isOnSubmissionDetailsPage = !!submissionId
  return (
    <div>
      <Helmet title={challengeTitle || 'Challenge Details'} />
      <PageHeader title={challengeTitle} tags={challengeTags} />
      <div className={styles.challenges}>
        <ChallengeInfo challenge={challenge} />
        {!isOnSubmissionDetailsPage &&
          <List
            challenge={challenge}
            isMarathonMatch={isMarathonMatch(challenge)}
            isChallengeSubmissionsLoading={isChallengeSubmissionsLoading}
            challengeSubmissions={challengeSubmissions}
            challengeId={challengeId}
          />}
        {isOnSubmissionDetailsPage &&
          <SubmissionDetails
            submissionId={submissionId}
            isSubmissionLoading={isSubmissionLoading}
            submissionDetails={submissionDetails}
            challengeId={challengeId}
            downloadToken={userToken}
          />}
      </div>
    </div>
  )
}

ChallengeDetailsComponent.propTypes = {
  challenge: PropTypes.object,
  challengeTypes: PropTypes.arrayOf(PropTypes.object),
  submissionId: PropTypes.string,
  submissionDetails: PropTypes.object,
  isSubmissionLoading: PropTypes.bool,
  challengeSubmissions: PropTypes.arrayOf(PropTypes.object),
  isChallengeSubmissionsLoading: PropTypes.bool,
  userToken: PropTypes.string
}

ChallengeDetailsComponent.defaultProps = {
  challenge: null,
  challengeTypes: []
}

export default ChallengeDetailsComponent
