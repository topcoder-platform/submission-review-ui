/**
 * Component to render member handles with a link to profile page
 */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { getTCMemberURL, SYSTEM_USERS } from '../../config/constants'
import styles from './Handle.module.scss'

const Handle = ({ handle, color, className }) => {
  const link = getTCMemberURL(handle)
  if (SYSTEM_USERS.includes(handle)) return <span style={{ color: color }} className={cn(styles.handle, className)} >{handle}</span>
  return <a href={link} style={{ color: color }} className={cn(styles.handle, className)} >{handle}</a>
}

Handle.propTypes = {
  handle: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string
}

export default Handle
