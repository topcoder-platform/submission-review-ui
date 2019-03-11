/**
 * Component to render when there is no active challenge
 */
import React from 'react'
import styles from './NoReviews.module.scss'

const NoChallenge = () => {
  return (
    <div className={styles.noReviews}>
      <p>There are no reviews available for this submission</p>
      <p>or you don’t have access to view them.</p>
    </div>
  )
}

export default NoChallenge
