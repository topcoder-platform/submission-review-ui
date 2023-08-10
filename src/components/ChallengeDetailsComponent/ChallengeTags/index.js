import React from 'react'
import PropTypes from 'prop-types'
import styles from './ChallengeTags.module.scss'
import Tag from '../../Tag'
import { fixedTrack } from '../../../util/tc'

const ChallengeTags = ({ challenge }) => {
  const {
    legacy: {
      track,
      subTrack
    },
    tags,
    roles
  } = challenge

  const trackTag = <Tag track={fixedTrack(track, subTrack)} subTrack={subTrack} />
  const techAndPlatformTags = tags.map((t, i) => <Tag value={t} key={`tag-${t}-${i}`} />)
  const roleTags = (roles || []).map((r, i) => <Tag roleTag value={r} key={`role-${r}-${i}`} />)
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {trackTag}
        {techAndPlatformTags}
      </div>
      <div className={styles.right}>
        {roleTags}
      </div>
    </div>
  )
}

ChallengeTags.propTypes = {
  challenge: PropTypes.object
}

ChallengeTags.defaultProps = {
  challenge: {}
}

export default ChallengeTags
