import React from 'react'
import PropTypes from 'prop-types'
import styles from './Prizes.module.scss'

function getOrdinal (num) {
  const ordinals = ['th', 'st', 'nd', 'rd']
  const v = num % 100
  const suffix = ordinals[(v - 20) % 10] || ordinals[v] || ordinals[0]
  return `${num}${suffix}`
}

function numberWithCommas (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function extractPlacementPrizeValues (data) {
  const placementPrizeValues = []

  data.forEach(item => {
    if (item.type === 'placement') {
      item.prizes.forEach(prize => {
        placementPrizeValues.push(prize.value)
      })
    }
  })

  return placementPrizeValues
}

const Prizes = ({ prizeSets }) => {
  const prizes = prizeSets ? extractPlacementPrizeValues(prizeSets) : [0]
  const prizeComponents = prizes.map((p, index) => (
    <div className={styles.prize} key={`prize-${p}-${index}`}>
      <span className={styles.rank}>{getOrdinal(index + 1)}</span>
      <span className={styles.amount}>${numberWithCommas(p)}</span>
    </div>
  ))

  return (
    <div className={styles.prizes}>
      {prizeComponents}
    </div>
  )
}

Prizes.propTypes = {
  prizeSets: PropTypes.arrayOf(PropTypes.object)
}

Prizes.defaultProps = {
  prizeSets: []
}

export default Prizes
