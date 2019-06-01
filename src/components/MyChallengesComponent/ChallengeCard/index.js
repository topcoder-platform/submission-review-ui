/**
 * Component to render a row for ChallengeList component
 */
import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment'
import 'moment-duration-format'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faUser } from '@fortawesome/free-solid-svg-icons'

import TrackIcon from '../../TrackIcon'
import styles from './ChallengeCard.module.scss'
import { getFormattedDuration, getLastDate } from '../../../util/date'

const STALLED_MSG = 'Stalled'
const DRAFT_MSG = 'In Draft'
const STALLED_TIME_LEFT_MSG = 'Challenge is currently on hold'
const FF_TIME_LEFT_MSG = 'Winner is working on fixes'

const getEndDate = (c) => {
  let phases = c.allPhases
  if (c.subTrack === 'FIRST_2_FINISH' && c.status === 'COMPLETED') {
    phases = c.allPhases.filter(p => p.phaseType === 'Iterative Review' && p.phaseStatus === 'Closed')
  }
  const endPhaseDate = getLastDate(phases.map(d => new Date(d.scheduledEndTime)))
  return moment(endPhaseDate).format('MMM DD')
}

/**
 * Format the remaining time of a challenge phase
 * @param phase Challenge phase
 * @returns {*}
 */
const getTimeLeft = (phase) => {
  if (!phase) return STALLED_TIME_LEFT_MSG
  if (phase.phaseType === 'Final Fix') {
    return FF_TIME_LEFT_MSG
  }

  let time = moment(phase.scheduledEndTime).diff()
  const late = time < 0
  if (late) time = -time
  const duration = getFormattedDuration(time)
  return late ? `Late by ${duration}` : `${duration} to go`
}

/**
 * Find current phase and remaining time of it
 * @param c Challenge
 * @returns {{phaseMessage: string, endTime: {late, text}}}
 */
const getPhaseInfo = (c) => {
  const { allPhases, currentPhases, subTrack, status } = c
  const checkPhases = (currentPhases && currentPhases.length > 0 ? currentPhases : allPhases)
  let statusPhase = checkPhases
    .filter(p => p.phaseType !== 'Registration')
    .sort((a, b) => moment(a.scheduledEndTime).diff(b.scheduledEndTime))[0]

  if (!statusPhase && subTrack === 'FIRST_2_FINISH' && checkPhases.length) {
    try {
      statusPhase = Object.clone(checkPhases[0])
      statusPhase.phaseType = 'Submission'
    } catch (e) {}
  }
  let phaseMessage = STALLED_MSG
  if (statusPhase) phaseMessage = statusPhase.phaseType
  else if (status === 'DRAFT') phaseMessage = DRAFT_MSG

  const endTime = getTimeLeft(statusPhase)
  return { phaseMessage, endTime }
}

const ChallengeCard = ({ challenge }) => {
  let roles
  if (challenge.userDetails && challenge.userDetails.roles.length > 0) {
    // remove duplicate roles
    const uniqRoles = _.uniq(challenge.userDetails.roles)
    if (uniqRoles.length <= 3) {
      roles = uniqRoles.map((r, i) => (
        <span className={styles.block} key={`challenge-role-${r}-${i}`}>{r}</span>
      ))
    } else {
      roles = uniqRoles.slice(0, 3).map((r, i) => {
        if (i < 2) {
          return (
            <span className={styles.block} key={`challenge-role-${r}-${i}`}>{r}</span>
          )
        }

        return (
          <span className={styles.block} key={`challenge-role-${r}-${i}`}>2 more</span>
        )
      })
    }
  }
  const { phaseMessage, endTime } = getPhaseInfo(challenge)
  return (
    <Link to={`challenges/${challenge.id}`}>
      <div className={styles.item}>
        <div className={styles.col1}>
          <div>
            <TrackIcon className={styles.icon} track={challenge.track} subTrack={challenge.subTrack} />
          </div>
          <div className={styles.name}>
            <span className={styles.block}>{challenge.name}</span>
            <span className='block light-text'>Ends {getEndDate(challenge)}</span>
          </div>
        </div>
        <div className={styles.col2}>
          {roles}
        </div>
        <div className={styles.col3}>
          <span className={styles.block}>{phaseMessage}</span>
          <span className='block light-text'>{endTime}</span>
        </div>
        <div className={styles.col4}>
          <div className={styles.faIconContainer}>
            <FontAwesomeIcon icon={faUser} className={styles.faIcon} />
            <span>{challenge.numRegistrants}</span>
          </div>
          <div className={styles.faIconContainer}>
            <FontAwesomeIcon icon={faFile} className={styles.faIcon} />
            <span>{challenge.numSubmissions}</span>
          </div>
        </div>
      </div>
    </Link>

  )
}

ChallengeCard.propTypes = {
  challenge: PropTypes.object
}

export default withRouter(ChallengeCard)
