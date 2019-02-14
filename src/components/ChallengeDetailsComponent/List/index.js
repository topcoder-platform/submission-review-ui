/**
 * Component to render submissions of a challenge
 * It uses different components for rendering Marathon Matches and other ones
 */
import React from 'react'
import PropTypes from 'prop-types'
import MMSubmissionList from './MMSubmissionList'
import SubmissionList from './SubmissionList'
import styles from './List.module.scss'

const List = ({ submissions, isMarathonMatch, challengeId }) => {
  return (
    <div>
      <h2 className={styles.heading}>Submissions</h2>
      {isMarathonMatch && <MMSubmissionList submissions={submissions} challengeId={challengeId} />}
      {!isMarathonMatch && <SubmissionList submissions={submissions} challengeId={challengeId} />}
    </div>
  )
}

List.propTypes = {
  submissions: PropTypes.arrayOf(PropTypes.object),
  isMarathonMatch: PropTypes.bool,
  challengeId: PropTypes.number
}

export default List
