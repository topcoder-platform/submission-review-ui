/**
 * Component to render technology, platform and subTrack tags for challenge
 */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './Tag.module.scss'

import { CHALLENGE_TRACKS } from '../../config/constants'

/**
 * For a given sub track checks the challengeTypes for formatted subTrack name
 * If it doesn't exist formats subTrack by removing underscores and capitalizing it
 * @param t subTrack
 * @returns {*}
 */
const stylizedSubTrack = (t) => {
  return (t || '').replace(/_/g, ' ')
    .replace(/\w\S*/g,
      // capitalize
      txt => [txt.charAt(0).toUpperCase(), txt.toLowerCase().slice(1)].join('')
    )
}

const Tag = ({ track, subTrack, value, roleTag }) => {
  const className = cn(styles.tag, {
    [styles.dataScience]: track === CHALLENGE_TRACKS.DATA_SCIENCE,
    [styles.development]: track === CHALLENGE_TRACKS.DEVELOP,
    [styles.design]: track === CHALLENGE_TRACKS.DESIGN,
    [styles.role]: roleTag
  })

  if (subTrack) {
    value = stylizedSubTrack(subTrack)
  }

  return (
    <div>
      <div className={className}>
        <span>{value}</span>
      </div>
    </div>
  )
}

Tag.propTypes = {
  track: PropTypes.string,
  subTrack: PropTypes.string,
  value: PropTypes.string,
  roleTag: PropTypes.bool
}

Tag.defaultProps = {
  track: '',
  subTrack: null,
  roleTag: false
}

export default Tag
