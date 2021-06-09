import React from 'react'
import PropTypes from 'prop-types'
import styles from './ChallengeTags.module.scss'
import Tag from '../../Tag'
import { fixedTrack } from '../../../util/tc'

const ChallengeTags = ({ challenge, challengeTypes, roles }) => {
  const {
    track,
    legacy,
    tags
  } = challenge

  const { subTrack } = legacy

  const trackTag = <Tag track={fixedTrack(track, subTrack)} subTrack={subTrack} challengeTypes={challengeTypes} />
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
  challenge: PropTypes.object,
  challengeTypes: PropTypes.arrayOf(PropTypes.object),
  roles: PropTypes.arrayOf(PropTypes.string)
}

ChallengeTags.defaultProps = {
  challenge: {},
  challengeTypes: [],
  roles: []
}

export default ChallengeTags
