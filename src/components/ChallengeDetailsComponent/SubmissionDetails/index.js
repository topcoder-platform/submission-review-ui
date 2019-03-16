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
import { downloadSubmissionURL } from '../../../config/constants'
import NoReviews from './NoReviews'
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

function formattedScore (score) {
  if (typeof score === 'number') {
    return score.toFixed(2)
  } else {
    return score
  }
}

const SubmissionDetails = ({ submissionId, submissionDetails, challengeId, isSubmissionLoading, downloadToken }) => {
  const { review, reviewSummation } = submissionDetails
  const challengeDetailsLink = `/challenges/${challengeId}`

  if (isSubmissionLoading) {
    return <Loader />
  }

  const finalReview = {
    reviewType: 'Final score',
    reviewer: '',
    score: reviewSummation ? reviewSummation.aggregateScore : 'N/A',
    isPassing: reviewSummation ? reviewSummation.isPassing : undefined,
    className: '-'
  }

  const rows = review && [...review, finalReview].map(
    (r, i) => {
      const { reviewType, reviewer, color, score, isPassing } = r
      const isFailed = isPassing === false
      const isPassed = isPassing === true
      const statusIsDefined = isPassed || isFailed
      const status = isPassing ? 'Passed' : 'Failed'
      return (
        <Table.Row key={`review-${reviewType}-${reviewer}-${i}`} className={styles.item}>
          <Table.Col width={options[0].width}>
            <span className={r.className || styles.type}>{reviewType}</span>
          </Table.Col>
          <Table.Col width={options[1].width}>
            <Handle handle={reviewer} color={color} />
          </Table.Col>
          <Table.Col width={options[2].width}>
            <span className={cn(styles.score, { [styles.fail]: isFailed })}>{formattedScore(score)}</span>
          </Table.Col>
          <Table.Col width={options[3].width}>
            <span className={cn(styles.status, {
              [styles.fail]: isFailed,
              [styles.passed]: isPassed
            })}>{statusIsDefined ? status : 'N/A'}</span>
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
            <a href={downloadSubmissionURL(submissionId, downloadToken)}>
              {submissionId}
              <FontAwesomeIcon icon={faDownload} />
            </a>
            )
          </h2>
        </div>
        {(!review || review.length === 0)
          ? <NoReviews />
          : <Table rows={rows} options={options} className={styles.list} />
        }

      </>
  )
}

SubmissionDetails.propTypes = {
  submissionId: PropTypes.string,
  submissionDetails: PropTypes.object,
  challengeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isSubmissionLoading: PropTypes.bool,
  downloadToken: PropTypes.string
}

export default SubmissionDetails
