/**
 * Component to render challenge details and submission details pages
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import PageHeader from '../PageHeader'
import { getChallengeTags } from '../../util/challenge'
import ScoreCardDetails from './ScoreCardDetails'
import LeftChevronIcon from '../../assets/icons/chevron-left.svg'
import FileIcon from '../../assets/icons/file.svg'
import Loader from '../Loader'
import styles from './ScoreCardComponent.module.scss'

class ScoreCardComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formData: {}
    }

    this.onFormChange = this.onFormChange.bind(this)
  }

  componentDidMount () {
    this.setState({ formData: this.props.savedResponses })
  }

  onFormChange (form) {
    this.setState({ formData: form })
  }

  render () {
    const {
      challenge,
      challengeTypes,
      resources,
      scorecards,
      isLoading,
      saveAndSubmit,
      editMode,
      scorecardTitle,
      scorecardDescription,
      scoreCardId
    } = this.props

    const { formData } = this.state

    const { name } = challenge

    return (
      <div className={styles.scorecardPage}>
        <Helmet title={name || 'ScoreCard Details'} />
        <PageHeader title={name} tags={getChallengeTags(challenge, challengeTypes, resources)} />

        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.leftContent}>
              <Link to={`/challenges/${challenge.id}`}>
                <img src={LeftChevronIcon} className={styles.leftChevron} />
              </Link>
              <div>
                <h3 className={styles.title}>{scorecardTitle}</h3>
                <p className={styles.subTitle}>{scorecardDescription}</p>
              </div>
            </div>

            <div className={styles.rightContent}>
              <img src={FileIcon} className={styles.fileIcon} />
              <h5 className={styles.rightText}>Fill Scorecard</h5>
            </div>

          </div>
          {
            isLoading ? <Loader /> : (
              <ScoreCardDetails
                scorecards={scorecards}
                onFormChange={this.onFormChange}
                editMode={editMode}
                scoreCardId={scoreCardId} />
            )
          }
          {
            editMode &&
            <div className={styles.footer}>
              <div className={styles.left}>
                <a href={'#'} className={styles.secondaryButton}>Save for Later</a>
              </div>
              <div className={styles.right}>
                <a href={'#'} className={styles.secondaryButton}>Preview</a>
                {
                  <a onClick={() => saveAndSubmit(100, formData)} className={styles.primaryButton}>Save and Submit</a>
                }
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

ScoreCardComponent.propTypes = {
  challenge: PropTypes.object,
  challengeTypes: PropTypes.arrayOf(PropTypes.object),
  resources: PropTypes.object,
  scorecards: PropTypes.arrayOf(PropTypes.object),
  scoreCardId: PropTypes.string,
  isLoading: PropTypes.bool,
  saveAndSubmit: PropTypes.func,
  editMode: PropTypes.bool,
  scorecardTitle: PropTypes.string,
  scorecardDescription: PropTypes.string,
  savedResponses: PropTypes.arrayOf(PropTypes.object)
}

ScoreCardComponent.defaultProps = {
  challenge: null,
  reviewSummations: [],
  challengeTypes: [],
  resources: {},
  savedResponses: []
}

export default ScoreCardComponent
