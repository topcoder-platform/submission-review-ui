import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Score from './Score'
import { v4 as uuidv4 } from 'uuid'
import styles from './ScoringSelector.module.scss'

class ScoringSelector extends Component {
  constructor (props) {
    super(props)
    this.onClickScore = this.onClickScore.bind(this)
  }

  onClickScore (value) {
    this.props.onChange(value)
  }

  render () {
    const { maxRating, currentValue } = this.props

    return (
      <div className={styles.selectorContainer} key={uuidv4()}>
        <div className={styles.scoringSelector}>
          {
            _.range(1, maxRating + 1).map((rating) => (
              <Score
                id={uuidv4()}
                key={uuidv4()}
                value={rating}
                selected={rating === currentValue}
                onClick={() => this.onClickScore(rating)}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

ScoringSelector.defaultProps = {
  maxRating: 5,
  currentValue: 0
}

ScoringSelector.propTypes = {
  maxRating: PropTypes.number,
  currentValue: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

export default ScoringSelector
