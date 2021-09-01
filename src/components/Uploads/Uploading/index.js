/**
 * Functional component that shows progress of upload (to Topcoder) and if the upload was a success or failure
 */

import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as RobotHappy } from '../../../assets/images/robot-happy.svg'
import { ReactComponent as RobotSad } from '../../../assets/images/robot-embarassed.svg'
import styles from './Uploading.module.scss'

const Uploading = ({
  error,
  isSubmitting,
  submissionUploaded,
  reset,
  retry,
  uploadProgress
}) => (
  <div className={styles.container}>
    <div className={styles.uploading}>
      {
        isSubmitting && (
          <h3>
            UPLOADING SUBMISSION
          </h3>
        )
      }
      {
        submissionUploaded && (
          <h3>
            SUBMISSION COMPLETED
          </h3>
        )
      }
      {
        error && (
          <h3>
            ERROR SUBMITTING
          </h3>
        )
      }
      {
        (isSubmitting || submissionUploaded) && <RobotHappy />
      }
      {
        error && <RobotSad />
      }
      {
        isSubmitting && (
          <p>
            Hey, your work is AWESOME! Please don&#39;t close this window while I&#39;m
            working, you&#39;ll lose all files!
          </p>
        )
      }
      {
        isSubmitting && !submissionUploaded && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${(100 * uploadProgress).toFixed()}%` }} />
          </div>
        )
      }
      {
        isSubmitting && !submissionUploaded && (
          <p className={styles.submitting}>
            Uploaded:
            {(100 * uploadProgress).toFixed()}
            %
          </p>
        )
      }
      {
        error && (
          <p>
            Oh, that’s embarrassing! The file couldn’t be
            uploaded, I’m so sorry.
          </p>
        )
      }
      {
        error && (
          <div className={styles.errorMsg}>
            {error}
          </div>
        )
      }
      {
        error && (
          <div className={styles.buttonContainer}>
            <button
              onClick={() => reset()}
              className={styles.resetButton}
            >
              Cancel
            </button>
            <button
              onClick={() => retry()}
              className={styles.retryButton}
            >
              Try Again
            </button>
          </div>
        )
      }
      {
        submissionUploaded && !error && (
          <p>
            Thanks for participating! We’ve received your submission and will
            send you an email shortly to confirm and explain what happens next.
          </p>
        )
      }
    </div>
  </div>
)

Uploading.propTypes = {
  error: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  submissionUploaded: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  retry: PropTypes.func.isRequired,
  uploadProgress: PropTypes.number
}

export default Uploading
