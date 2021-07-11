/**
 * Switch Button component
 */
import React from 'react'
import PT from 'prop-types'
import styles from './SwitchButton.module.scss'

const SwitchButton = ({
  checked,
  id,
  onToggle,
  text,
  disabled
}) => (
  <div className={styles.SwitchButton}>
    <div className={styles.onoffswitch}>
      <input
        type='checkbox'
        name='eprf-onoffswitch'
        id={`pre-onoffswitch-${id}`}
        checked={checked}
        onChange={onToggle}
        className={styles.checkbox}
        disabled={disabled}
      />
      <label htmlFor={`pre-onoffswitch-${id}`} className={styles.label}>
        <span className={styles.inner} />
        <span className={styles.switch} />
        <input type='hidden' />
      </label>
    </div>
    <p className={styles.primary}>
      {text}
    </p>
  </div>
)

SwitchButton.defaultProps = {
  disabled: false
}

SwitchButton.propTypes = {
  id: PT.string.isRequired,
  checked: PT.bool.isRequired,
  text: PT.string.isRequired,
  onToggle: PT.func.isRequired,
  disabled: PT.bool
}

export default SwitchButton
