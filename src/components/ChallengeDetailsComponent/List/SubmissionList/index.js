/**
 * Component to render submissions of challenges other than Marathon Matches
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import _ from 'lodash'
import Table from '../../../Table'
import styles from './SubmissionList.module.scss'
import Handle from '../../../Handle'
import NoSubmissions from '../NoSubmissions'
import { SUBMISSION_TABS } from '../../../../config/constants'
import { isCopilotUser } from '../../../../util/challenge'

// Table options for non MM matches
const options = [
  {
    name: 'Submission ID',
    width: 5
  },
  {
    name: 'Review Date',
    width: 3
  },
  {
    name: 'Score',
    width: 2
  },
  {
    name: 'Action',
    width: 1
  }
]

class SubmissionList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentTab: SUBMISSION_TABS.CONTEST_SUBMISSION
    }
  }

  render () {
    const { submissions, challengeId, isDesignChallenge, resources } = this.props
    const { currentTab } = this.state

    if (submissions.length === 0) {
      return <NoSubmissions />
    }

    const filteredSubmissions = _.filter(submissions, { type: currentTab })

    const rows = _.orderBy(filteredSubmissions, 'type').map((s, i) => {
      const { id, review } = s
      const aggregateScore = review ? review[0].score.toFixed(2) : 'N/A'
      const reviewDate = (review && review[0])
        ? moment(review[0].updated || review[0].created).format('MMM DD, HH:mma')
        : 'N/A'
      const isFailed = review ? review[0].isPassing : false
      const scoreCardId = review ? review[0].scoreCardId : 0

      return (
        <Table.Row key={`submission-${s.memberId}-${i}`} className={styles.item}>
          <Table.Col width={options[0].width}>
            <Link
              className={styles.submissionLink}
              to={`/challenges/${challengeId}/submissions/${id}`}
            >
              {id}
            </Link>
            {s.createdBy && (
              <div className={styles.handle}>
                <span>(</span>
                <Handle handle={s.createdBy} color={s.memberHandleColor} />
                <span>)</span>
              </div>
            )}
          </Table.Col>
          <Table.Col width={options[1].width}>
            <span className={styles.date}>{reviewDate}</span>
          </Table.Col>
          <Table.Col width={options[2].width}>
            <span className={cn(styles.score, { [styles.fail]: isFailed })}>
              {aggregateScore}
            </span>
          </Table.Col>
          <Table.Col width={options[3].width}>
            {
              isCopilotUser(challengeId, resources)
                ? <a href={`/challenges/${challengeId}/submissions/${id}/scorecards/${scoreCardId}`} className={styles.btn}>Edit</a>
                : <a href={`/challenges/${challengeId}/submissions/${id}/scorecards/${scoreCardId}`} className={styles.viewScoreBtn}>View score</a>
            }
          </Table.Col>
        </Table.Row>
      )
    })
    return (
      <>
        <div className={styles.tabs}>
          <div
            className={
              currentTab === SUBMISSION_TABS.CONTEST_SUBMISSION
                ? cn(styles.tab, styles.active)
                : styles.tab
            }
            onClick={() =>
              this.setState({ currentTab: SUBMISSION_TABS.CONTEST_SUBMISSION })
            }
          >
            Contest Submission
          </div>
          {
            isDesignChallenge &&
            <div
              className={
                currentTab === SUBMISSION_TABS.CHECKPOINT_SUBMISSION
                  ? cn(styles.tab, styles.active)
                  : styles.tab
              }
              onClick={() =>
                this.setState({ currentTab: SUBMISSION_TABS.CHECKPOINT_SUBMISSION })
              }
            >
              Checkpoint Submission
            </div>
          }
        </div>
        <Table rows={rows} options={options} className={styles.list} />
      </>
    )
  }
}

SubmissionList.propTypes = {
  submissions: PropTypes.arrayOf(PropTypes.object),
  challengeId: PropTypes.string,
  isDesignChallenge: PropTypes.bool,
  resources: PropTypes.object
}

export default SubmissionList
