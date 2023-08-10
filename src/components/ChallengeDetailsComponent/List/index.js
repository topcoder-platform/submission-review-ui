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

const List = ({ isChallengeSubmissionsLoading, challengeSubmissions, isMarathonMatch, challengeId }) => {
  if (isChallengeSubmissionsLoading) {
    return <Loader />
  }

  return (
    <div>
      <h2 className={styles.heading}>Submissions</h2>
      {isMarathonMatch &&
        <MMSubmissionList submissions={challengeSubmissions} challengeId={challengeId} />}
      {!isMarathonMatch &&
        <SubmissionList submissions={challengeSubmissions} challengeId={challengeId} />}
    </div>
  )
}

List.propTypes = {
  isChallengeSubmissionsLoading: PropTypes.bool,
  challengeSubmissions: PropTypes.arrayOf(PropTypes.object),
  isMarathonMatch: PropTypes.bool,
  challengeId: PropTypes.number
}

export default List
