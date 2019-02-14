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

const ChallengeDetailsComponent = ({ challenge, challengeTypes, submissionId, submissionDetails, isSubmissionLoading }) => {
  const { submissions, challengeId, name } = challenge
  const challengeTags = <ChallengeTags challenge={challenge} challengeTypes={challengeTypes} />
  const isOnSubmissionDetailsPage = !!submissionId
  return (
    <div>
      <Helmet title={name || 'Challenge Details'} />
      <PageHeader title={name} tags={challengeTags} />
      <div className={styles.challenges}>
        <ChallengeInfo challenge={challenge} />
        {!isOnSubmissionDetailsPage &&
          <List isMarathonMatch={isMarathonMatch(challenge)} submissions={submissions} challengeId={challengeId} />}
        {isOnSubmissionDetailsPage &&
          <SubmissionDetails isSubmissionLoading={isSubmissionLoading} submissionDetails={submissionDetails}
            challengeId={challengeId} />}
      </div>
    </div>
  )
}

ChallengeDetailsComponent.propTypes = {
  challenge: PropTypes.object,
  challengeTypes: PropTypes.arrayOf(PropTypes.object),
  submissionId: PropTypes.string,
  submissionDetails: PropTypes.object,
  isSubmissionLoading: PropTypes.bool
}

ChallengeDetailsComponent.defaultProps = {
  challenge: {},
  challengeTypes: []
}

export default ChallengeDetailsComponent
