/**
 * Component to render an icon for a track, subTrack pair
 * Uses './Abbreviation.js' for choosing an abbreviation for a subTrack
 */
import React from 'react'
import PropTypes from 'prop-types'
import Abbreviation from './Abbreviation'
import cn from 'classnames'
import styles from './TrackIcon.module.scss'

const TrackIcon = ({ track, subTrack, className }) => {
  return (
    <span className={cn(styles.icon, className)}>
      <div className={`${track.toLowerCase()}`}>
        {Abbreviation[track][subTrack] || 'NA'}
      </div>
    </span>
  )
}

TrackIcon.propTypes = {
  track: PropTypes.string,
  subTrack: PropTypes.string,
  className: PropTypes.string
}

export default TrackIcon
