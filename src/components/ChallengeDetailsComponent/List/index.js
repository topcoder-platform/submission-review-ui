/**
 * Component to render submissions of a challenge
 * It uses different components for rendering Marathon Matches and other ones
 */
import React from 'react'
import PropTypes from 'prop-types'
import { find, get } from 'lodash'
import MMSubmissionList from './MMSubmissionList'
import SubmissionList from './SubmissionList'
import Loader from '../../Loader'
import styles from './List.module.scss'

const List = ({ submitters, isChallengeSubmissionsLoading, challengeSubmissions, isMarathonMatch, challengeId }) => {
  if (isChallengeSubmissionsLoading) {
    return <Loader />
  }

  const submissionsWithMemberHandleColors = challengeSubmissions.map(s => {
    const registrant = find(submitters, { userId: s.memberId })
    const memberHandleColor = get(registrant, 'maxRating.ratingColor', '')

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
  challengeId: PropTypes.string
}

export default List
