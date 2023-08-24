import React from 'react'
import PropTypes from 'prop-types'
import styles from './Phases.module.scss'
import moment from 'moment'
import cn from 'classnames'
import { getRoundFormattedDuration } from '../../../../util/date'

const Phases = ({ phases }) => {
  const circle = (p) => <div className={cn(styles.circle, { [styles.green]: p.isOpen || !!p.actualEndDate })} />

  const phaseComponents = phases
    .map(
      p => {
        const startTime = moment(p.actualStartTime || p.scheduledStartTime)
        const day = startTime.format('MMM DD')
        const time = startTime.format('HH:mma')
        const duration = getRoundFormattedDuration(p.duration)
        return (
          <div className={cn(styles.phase, { [styles.open]: p.isOpen })} key={p.phaseId}>
            <div className={cn(styles.type, { [styles.open]: p.isOpen })}>
              {circle(p)}
              <span>{p.name}</span>
            </div>
            <div className={styles.date}><span className='bold' >{day}</span>, {time}</div>
            <div className={styles.duration} >{duration}</div>
          </div>
        )
      }
    )

  return (
    <div className={styles.container}>
      {phaseComponents}
    </div>
  )
}

Phases.propTypes = {
  phases: PropTypes.arrayOf(PropTypes.object)
}

Phases.defaultProps = {
  challenge: {}
}

export default Phases
