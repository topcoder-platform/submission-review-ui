/**
 * Component to render submissions of challenges other than Marathon Matches
 */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import Table from '../../../Table'
import styles from './SubmissionList.module.scss'
import Handle from '../../../Handle'

// Table options for non MM matches
const options = [
  {
    name: 'Submission ID',
    width: 6
  },
  {
    name: 'Review Date',
    width: 5
  },
  {
    name: 'Score',
    width: 1
  }
]

const SubmissionList = ({ submissions, challengeId }) => {
  const rows = submissions.map(
    (s, i) => {
      const submission = s.submissions[0]
      const { submissionId, submissionTime, score, isFailed } = submission
      const reviewDate = moment(submissionTime).format('MMM DD, HH:mma')

      return (
        <Table.Row key={`submission-${s.submitterId}-${i}`} className={styles.item}>
          <Table.Col width={options[0].width}>
            <Link className={styles.submissionLink} to={`/challenges/${challengeId}/submissions/${submissionId}`}>
              {submissionId}
            </Link>
            <div className={styles.handle}>
              <span>(</span><Handle handle={s.submitter} color={s.color} /><span>)</span>
            </div>
          </Table.Col>
          <Table.Col width={options[1].width}>
            <span className={styles.date}>{reviewDate}</span>
          </Table.Col>
          <Table.Col width={options[2].width}>
            <span className={cn(styles.score, { [styles.fail]: !!isFailed })} >{score > -1 ? score.toFixed(2) : 'N/A'}</span>
          </Table.Col>
        </Table.Row>
      )
    }
  )
  return (
    <Table rows={rows} options={options} className={styles.list} />
  )
}

SubmissionList.propTypes = {
  submissions: PropTypes.arrayOf(PropTypes.object),
  challengeId: PropTypes.number
}

export default SubmissionList
