/**
 * Component to render submission details
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faDownload } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'
import Table from '../../Table'
import Handle from '../../Handle'
import Loader from '../../Loader'
import { REVIEW_STATUS } from '../../../config/constants'
import styles from './SubmissionDetails.module.scss'

// Table options for review list
const options = [
  {
    name: 'Review Type',
    width: 6
  },
  {
    name: 'Reviewer',
    width: 5
  },
  {
    name: 'Score',
    width: 3
  },
  {
    name: 'Status',
    width: 1
  }
]

const SubmissionDetails = ({ submissionDetails, challengeId, isSubmissionLoading }) => {
  const { submissionId, finalScore, finalStatus, reviews } = submissionDetails
  const submissionDownloadLink = '#'
  const challengeDetailsLink = `/challenges/${challengeId}`

  if (isSubmissionLoading) {
    return <Loader />
  }

  const finalReview = {
    type: 'Final score',
    reviewer: '',
    score: finalScore,
    status: finalStatus,
    className: '-'
  }

  const rows = reviews && [...reviews, finalReview].map(
    r => {
      const { type, reviewer, color, score, status } = r
      const isFailed = status === REVIEW_STATUS.FAILED
      const isPassed = status === REVIEW_STATUS.PASSED
      return (
        <Table.Row key={`review-${type}-${reviewer}`} className={styles.item}>
          <Table.Col width={options[0].width}>
            <span className={r.className || styles.type}>{type}</span>
          </Table.Col>
          <Table.Col width={options[1].width}>
            <Handle handle={reviewer} color={color} />
          </Table.Col>
          <Table.Col width={options[2].width}>
            <span className={cn(styles.score, { [styles.fail]: isFailed })}>{score}</span>
          </Table.Col>
          <Table.Col width={options[3].width}>
            <span className={cn(styles.status, {
              [styles.fail]: isFailed,
              [styles.passed]: isPassed
            })}>{status}</span>
          </Table.Col>
        </Table.Row>
      )
    }
  )
  return (
      <>
        <div className={styles.header}>
          <div className={styles.backButton}>
            <Link to={challengeDetailsLink} className='link-button'><FontAwesomeIcon icon={faChevronLeft} /></Link>
          </div>
          <h2 className={styles.heading}>
            Submission details
            (
            <a href={submissionDownloadLink}>{submissionId}<FontAwesomeIcon icon={faDownload} /></a>
            )
          </h2>
        </div>
        <Table rows={rows} options={options} className={styles.list} />
      </>
  )
}

SubmissionDetails.propTypes = {
  submissionDetails: PropTypes.object,
  challengeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isSubmissionLoading: PropTypes.bool
}

export default SubmissionDetails
