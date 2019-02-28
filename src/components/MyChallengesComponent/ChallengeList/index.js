/**
 * Component to render list of challenges
 */
import React from 'react'
import PropTypes from 'prop-types'
import Table from '../../Table'
import ChallengeCard from '../ChallengeCard'
import styles from './ChallengeList.module.scss'
import NoChallenge from '../NoChallenge'

const options = [
  {
    name: 'Challenge',
    width: 6
  },
  {
    name: 'My roles',
    width: 2
  },
  {
    name: 'Current phase',
    width: 3
  },
  {
    name: '',
    width: 2
  }
]

const ChallengeList = ({ challenges }) => {
  const rows = challenges.map(c => <ChallengeCard challenge={c} options={options} key={`challenge-card-${c.id}`} />)
  return challenges.length === 0 ? <NoChallenge /> : (<Table rows={rows} options={options} className={styles.list} />)
}

ChallengeList.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.object)
}

export default ChallengeList
