import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './ChallengeInfo.module.scss'
import Prizes from './Prizes'
import Phases from './Phases'
import { getTCChallengeURL } from '../../../config/constants'
import { createReviewRecords } from '../../../actions/challengeSubmissions'
import { getChallengePrizes } from '../../../util/challenge'

const ChallengeInfo = ({
  challenge,
  createReviewRecords,
  isSubmittingReviews,
  maySubmitReviews
}) => {
  const {
    id,
    phases,
    numOfRegistrants,
    numOfSubmissions
  } = challenge

  const challengeURL = getTCChallengeURL(id)
  const prizes = getChallengePrizes(challenge)

  return (
    <div className={styles.container}>
      <div className={styles.prizeAndStats}>
        <Prizes prizes={prizes} />
        <div className={styles.stats}>
          <div><span className='bold'>{numOfRegistrants}</span> Registrants</div>
          <div><span className='bold'>{numOfSubmissions}</span> Submissions</div>
        </div>
      </div>
      <div className={styles.phases}><Phases phases={phases} /></div>
      <div className={styles.actions}>
        {maySubmitReviews ? (
          <span
            className={cn(
              styles.challengeButton,
              { [styles.btnDisabled]: isSubmittingReviews || !numOfSubmissions }
            )}
            onClick={isSubmittingReviews ? null : createReviewRecords}
          >
            Submit Winners
          </span>
        ) : (
          <a href={challengeURL} className={styles.challengeButton}>View Challenge</a>
        )}
      </div>
    </div>
  )
}

ChallengeInfo.propTypes = {
  challenge: PropTypes.object,
  createReviewRecords: PropTypes.func.isRequired,
  isSubmittingReviews: PropTypes.bool,
  maySubmitReviews: PropTypes.bool
}

ChallengeInfo.defaultProps = {
  challenge: {}
}

const mapStateToProps = ({
  challengeSubmissions: { hasSubmittedReviews, isLoading, isSubmittingReviews }
}) => ({
  isSubmittingReviews,
  maySubmitReviews: !isLoading && !hasSubmittedReviews
})

const mapDispatchToProps = {
  createReviewRecords
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeInfo)
