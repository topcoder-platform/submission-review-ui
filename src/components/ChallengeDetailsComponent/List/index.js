/**
 * Component to render submissions of a challenge
 * It uses different components for rendering Marathon Matches and other ones
 */
import React from 'react'
import PropTypes from 'prop-types'
import MMSubmissionList from './MMSubmissionList'
import SubmissionList from './SubmissionList'
import Loader from '../../Loader'
import styles from './List.module.scss'

const List = ({ submitters, isChallengeSubmissionsLoading, challengeSubmissions, isMarathonMatch, challengeId }) => {
  if (isChallengeSubmissionsLoading) {
    return <Loader />
  }

  const submissionsWithMemberHandleColors = challengeSubmissions.map(s => {
    const registrant = _.find(submitters, { userId: s.memberId })
    const memberHandleColor = _.get(registrant, 'ratingColor', '')

    return {
      ...s,
      memberHandleColor
    }
  })

  return (
    <div>
      <h2 className={styles.heading}>Submissions</h2>
      {isMarathonMatch &&
        <MMSubmissionList submissions={submissionsWithMemberHandleColors} challengeId={challengeId} />}
      {!isMarathonMatch &&
        <SubmissionList submissions={submissionsWithMemberHandleColors} challengeId={challengeId} />}
    </div>
  )
}

List.propTypes = {
  isChallengeSubmissionsLoading: PropTypes.bool,
  challengeSubmissions: PropTypes.arrayOf(PropTypes.object),
  submitters: PropTypes.arrayOf(PropTypes.object),
  isMarathonMatch: PropTypes.bool,
  challengeId: PropTypes.number
}

export default List
