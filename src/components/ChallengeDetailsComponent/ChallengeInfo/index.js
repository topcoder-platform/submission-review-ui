import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import styles from './ChallengeInfo.module.scss'
import Prizes from './Prizes'
import Phases from './Phases'
import { getTCChallengeURL } from '../../../config/constants'

const ChallengeInfo = ({ challenge }) => {
  const {
    id,
    phases,
    prizeSets,
    numOfRegistrants,
    numOfSubmissions
  } = challenge

  const challengeURL = getTCChallengeURL(id)
  const placementPrizes = _.find(prizeSets, { type: 'placement' })
  let { prizes } = placementPrizes || []

  return (
    <div className={styles.container}>
      <div className={styles.prizeAndStats}>
        <Prizes prizes={prizes} />
        <div className={styles.stats}>
          <div><span className='bold'>{numOfRegistrants}</span> Registrants</div>
          <div><span className='bold'>{numOfSubmissions}</span> Submissions</div>
        </div>
      </div>
      <div className={styles.phases}><Phases phases={phases} /></div>
      <div className={styles.actions}>
        <a href={challengeURL} className={styles.challengeButton}>View Challenge</a>
      </div>
    </div>
  )
}

ChallengeInfo.propTypes = {
  challenge: PropTypes.object
}

ChallengeInfo.defaultProps = {
  challenge: {}
}

export default ChallengeInfo
