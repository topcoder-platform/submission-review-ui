/**
 * Component to render top bar of app
 */
import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import styles from './Topbar.module.scss'
import Handle from '../Handle'

const TopBar = ({ user }) => {
  return (
    <div className={styles.topbar}>
      {user &&
        <div className={styles.details}>
          Welcome, <Handle handle={user.handle} color={user.color} />
          <Link to='#'>
            <FontAwesomeIcon icon={faSignInAlt} className={styles.icon} />
          </Link>
        </div>
      }
    </div>
  )
}

TopBar.propTypes = {
  user: PropTypes.object
}

export default TopBar
