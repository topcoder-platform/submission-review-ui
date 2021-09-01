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
import { SUBMISSION_TABS, PHASE_IDS } from '../../../../config/constants'
import { isReviewer, getScoreCardId, isSubmitter } from '../../../../util/challenge'
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

/**
 * Returns true if the provided phase is active for the challenge
 * @param {Object} challenge The challenge details
 * @param {String} phaseId The phase id to check if its active or not
 */
function isPhaseActiveOnChallenge (challenge, phaseId) {
  const currentPhases = _.filter(challenge.phases, p => p.isOpen)

  return currentPhases.some(p => p.phaseId === phaseId)
}

class SubmissionList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentTab: SUBMISSION_TABS.CONTEST_SUBMISSION
    }
  }

  render () {
    let submitFinalFixesButton
    const {
      submissions,
      challengeId,
      isDesignChallenge,
      resources,
      challenge,
      memberId
    } = this.props
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
      const canSubmitReview = !hasReview && ((isReviewer(challengeId, resources, memberId) && scoreCardId !== -1) || true) // TODO: FIX THIS

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
              getScoreCardId(challenge) !== -1 && (
                !hasReview
                  ? canSubmitReview && <a href={`/challenges/${challengeId}/submissions/${id}/scorecards/${getScoreCardId(challenge)}`} className={styles.btn}>Submit review</a>
                  : <a href={`/challenges/${challengeId}/submissions/${id}/scorecards/${scoreCardId}`} className={styles.viewScoreBtn}>View score</a>
              )
            }
          </Table.Col>
        </Table.Row>
      )
    })

    if (
      isSubmitter(challengeId, resources, memberId) &&
      currentTab === SUBMISSION_TABS.FINAL_FIX_SUBMISSION &&
      isDesignChallenge &&
      isPhaseActiveOnChallenge(challenge, PHASE_IDS.ApprovalPhase) &&
      filteredSubmissions.length === 0
    ) {
      // Rain Check:
      // - Current user is Submitter for the contest
      // - We are on the Final Fix tab
      // - We are showing details of a design track challenge
      // - Approval phase is active
      // - There are no Final Fix submissions
      // => Allow submitter to upload a submission, which will be of type Final Fix
      submitFinalFixesButton = (
        <p className={styles.secondaryBtnContainer}>
          <a href={`/challenges/${challengeId}/submit`} className={styles.btn}>
            Upload Final Fix
          </a>
        </p>
      )
    }

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
          {
            isDesignChallenge &&
            <div
              className={
                currentTab === SUBMISSION_TABS.FINAL_FIX_SUBMISSION
                  ? cn(styles.tab, styles.active)
                  : styles.tab
              }
              onClick={() =>
                this.setState({ currentTab: SUBMISSION_TABS.FINAL_FIX_SUBMISSION })
              }
            >
              Final Fix
            </div>
          }
        </div>
        <Table rows={rows} options={options} className={styles.list} />
        {submitFinalFixesButton}
      </>
    )
  }
}

SubmissionList.propTypes = {
  submissions: PropTypes.arrayOf(PropTypes.object),
  challengeId: PropTypes.string,
  isDesignChallenge: PropTypes.bool,
  resources: PropTypes.object,
  challenge: PropTypes.object,
  memberId: PropTypes.string.isRequired
}

export default SubmissionList
