/**
 * Component to render sidebar of app
 */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { faList } from '@fortawesome/free-solid-svg-icons'
import TopcoderLogo from '../../assets/images/topcoder-logo.png'
import styles from './Sidebar.module.scss'

const links = [
  {
    icon: faList,
    name: 'My Challenges',
    to: '/'
  }
]

const Sidebar = () => {
  const linkComponents = links.map(l => (
    <NavLink className={styles.item} activeClassName={styles.active} key={l.name} to={l.to} exact>
      {l.icon && <FontAwesomeIcon className={styles.icon} icon={l.icon} />}
      {l.name}
    </NavLink>
  ))

  return (
    <div className={styles.sidebar}>
      <img src={TopcoderLogo} className={styles.logo} />
      {linkComponents}
    </div>
  )
}

export default Sidebar
