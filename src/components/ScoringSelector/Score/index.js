import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './Score.module.scss'

const Score = ({ id, value, selected, onClick }) => {
  return (
    <div
      key={id}
      className={cn(styles.score, { [ styles.selected ]: selected })}
      onClick={() => onClick(value)}
    >
      <span className={cn(styles.text, { [styles.textSelected]: selected })}>{ value }</span>
    </div>
  )
}

Score.defaultProps = {
  selected: false
}

Score.propTypes = {
  id: PropTypes.string,
  value: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func
}

export default Score
