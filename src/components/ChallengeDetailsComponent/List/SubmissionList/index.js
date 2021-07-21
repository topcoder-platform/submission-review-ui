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
import { isReviewer, getScoreCardId } from '../../../../util/challenge'
import { getReviewForCurrentPhase } from '../../../../util/submission'

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
    const { submissions, challengeId, isDesignChallenge, resources, challenge } = this.props
    const { currentTab } = this.state

    if (submissions.length === 0) {
      return <NoSubmissions />
    }

    const filteredSubmissions = _.filter(submissions, { type: currentTab })

    const rows = _.orderBy(filteredSubmissions, 'type').map((s, i) => {
      const { id } = s
      const currentPhaseReviews = getReviewForCurrentPhase(s, challenge)
      const hasReview = currentPhaseReviews.length > 0
      const aggregateScore = _.get(currentPhaseReviews, '[0].score') ? currentPhaseReviews[0].score.toFixed(2) : 'N/A'
      const reviewDate = hasReview
        ? moment(currentPhaseReviews[0].updated || currentPhaseReviews[0].created).format('MMM DD, HH:mma')
        : 'N/A'
      const isFailed = hasReview ? currentPhaseReviews[0].isPassing : false
      const scoreCardId = hasReview ? currentPhaseReviews[0].scoreCardId : getScoreCardId(challenge)
      const canSubmitReview = !hasReview && ((isReviewer(challengeId, resources) && scoreCardId !== -1) || true) // TODO: FIX THIS

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
              !hasReview
                ? canSubmitReview && <a href={`/challenges/${challengeId}/submissions/${id}/scorecards/${getScoreCardId(challenge)}`} className={styles.btn}>Submit review</a>
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
  resources: PropTypes.object,
  challenge: PropTypes.object
}

export default SubmissionList
