import React from 'react'
import PropTypes from 'prop-types'
import styles from './Textarea.module.scss'

const Textarea = ({ value, onChange }) => {
  const onTextChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <textarea
      placeholder='Type here'
      className={styles.textarea}
      onChange={onTextChange}
      value={value}
      autoFocus
      onFocus={(e) => {
        const val = e.target.value
        e.target.value = ''
        e.target.value = val
      }}
    />
  )
}

Textarea.defaultProps = {
  value: ''
}

Textarea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default Textarea
