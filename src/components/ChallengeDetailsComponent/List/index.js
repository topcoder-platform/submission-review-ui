/**
 * Component to render submissions of a challenge
 * It uses different components for rendering Marathon Matches and other ones
 */
import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import MMSubmissionList from './MMSubmissionList'
import SubmissionList from './SubmissionList'
import DesignSubmissionList from './DesignSubmissionList'
import Loader from '../../Loader'
import { getChallengePrizes } from '../../../util/challenge'
import styles from './List.module.scss'

const List = ({
  challenge,
  isChallengeSubmissionsLoading,
  challengeSubmissions,
  isMarathonMatch,
  challengeId,
  isDesignChallenge,
  isPureV5Review,
  resources,
  memberId
}) => {
  if (isChallengeSubmissionsLoading) {
    return <Loader />
  }

  const submissionsWithMemberHandleColors = challengeSubmissions.map(s => {
    const registrant = _.find(challenge.registrants, {
      handle: s.memberHandle
    })
    const memberHandleColor = _.get(registrant, 'colorStyle', '').replace(
      /color:\s*/,
      ''
    )

    return {
      ...s,
      memberHandleColor
    }
  })

  return (
    <div>
      <h2 className={styles.heading}>Submissions</h2>
      {isMarathonMatch &&
        <MMSubmissionList
          submissions={submissionsWithMemberHandleColors}
          challengeId={challengeId}
        />
      }
      {!isMarathonMatch &&
        (isPureV5Review && isDesignChallenge ? (
          <DesignSubmissionList
            challengeId={challengeId}
            placeCount={getChallengePrizes(challenge).length}
            submissions={submissionsWithMemberHandleColors}
          />
        ) : (
          <SubmissionList
            submissions={submissionsWithMemberHandleColors}
            challengeId={challengeId}
            isDesignChallenge={isDesignChallenge}
            challenge={challenge}
            resources={resources}
            memberId={memberId}
          />
        ))}
    </div>
  )
}

List.propTypes = {
  challenge: PropTypes.object,
  isChallengeSubmissionsLoading: PropTypes.bool,
  challengeSubmissions: PropTypes.arrayOf(PropTypes.object),
  isMarathonMatch: PropTypes.bool,
  challengeId: PropTypes.string,
  isDesignChallenge: PropTypes.bool,
  isPureV5Review: PropTypes.bool.isRequired,
  resources: PropTypes.object,
  memberId: PropTypes.string.isRequired
}

export default List
