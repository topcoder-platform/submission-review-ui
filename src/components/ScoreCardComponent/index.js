/**
 * Component to render challenge details and submission details pages
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import _ from 'lodash'
import PageHeader from '../PageHeader'
import { getChallengeTags } from '../../util/challenge'
import ScoreCardDetails from './ScoreCardDetails'
import LeftChevronIcon from '../../assets/icons/chevron-left.svg'
import FileIcon from '../../assets/icons/file.svg'
import Loader from '../Loader'
import styles from './ScoreCardComponent.module.scss'

/**
 * Checks if all questions in the form / scorecard have been answered
 * @param {Array} formData The form to validate
 */
function validateForm (formData) {
  let formIsValid = true

  // Check if all sections / questions have been scored
  for (let i = 0; i < formData.length; i++) {
    const sections = formData[i]
    for (let j = 0; j < sections.length; j++) {
      if (_.isUndefined(sections[j].value)) {
        console.log('Unanswered question:', sections[j])
        // This section does not have a value
        formIsValid = false
        // Skip processing further to save time
        break
      }
    }

    // Skip validating other sections if a section is not valid to save time
    if (!formIsValid) {
      break
    }
  }

  return formIsValid
}

/**
 * Calculates the total score
 * @param {Array} formData The scorecard populated by the reviewer
 * @param {Array} scorecards The scorecard's template
 */
function calculateScore (formData, scorecards) {
  let actualOverallScore = 0

  for (let i = 0; i < formData.length; i++) {
    const actualScorecard = formData[i]
    const templateScorecard = scorecards[i]

    let actualSectionscore = 0
    let maxSectionScore = 0

    for (let j = 0; j < actualScorecard.length; j++) {
      if (
        _.isBoolean(actualScorecard[j].value) ||
        // For backward compatibility
        actualScorecard[j].value === 'true' ||
        actualScorecard[j].value === 'false'
      ) {
        // For boolean type, if it's true, then it gets full score else 0
        if (actualScorecard[j].value) {
          actualSectionscore += templateScorecard.children[j].weight
        }
      } else {
        // For non boolean types, we need to calculate the score based on the selected rating
        const questionScore = actualScorecard[j].value / templateScorecard.children[j].maxRating * templateScorecard.children[j].weight
        actualSectionscore += questionScore
      }

      maxSectionScore += templateScorecard.children[j].weight
    }

    actualOverallScore += actualSectionscore / maxSectionScore * templateScorecard.weight
  }

  // Rounding off to two decimal places
  return Math.round(actualOverallScore * 100) / 100
}

class ScoreCardComponent extends Component {
  constructor (props) {
    super(props)

    let formData

    // Do we have any previous responses for the scorecard? If so, use it
    if (this.props.savedResponses && this.props.savedResponses.length > 0) {
      formData = this.props.savedResponses
    } else {
      // We don't have any previous saved responses. So we will initialize a new scorecard response
      formData = this.props.scorecards.map((scorecard) => {
        const options = scorecard.children.map((item) => {
          const { title, type, description, scoreType } = item
          // If the scorecard question of type boolean?
          //    If Yes, then does it have substring 'YES' in its description?
          //      If Yes, then it will have a default value of true
          //      Else it will have a default value of false
          //    If it's not boolean it will have a value of undefined
          const value = scoreType === 'boolean'
            ? description.includes('YES')
            : undefined
          return {
            title,
            type,
            value,
            comment: ''
          }
        })
        return options
      })
    }

    this.state = {
      isFormValid: true,
      formData
    }

    this.onFormChange = this.onFormChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormChange (form) {
    this.setState({ formData: form })
  }

  /**
   * Validates and calculates the final score of the scorecard
   */
  onFormSubmit () {
    const { formData } = this.state
    const { scorecards, saveAndSubmit } = this.props

    if (!validateForm(formData)) {
      this.setState({ isFormValid: false })
      return
    }

    this.setState({ isFormValid: true }) // To hide any previous error messages

    const actualOverallScore = calculateScore(formData, scorecards)

    saveAndSubmit(actualOverallScore, formData)
  }

  render () {
    const {
      challenge,
      challengeTypes,
      resources,
      scorecards,
      isLoading,
      editMode,
      scorecardTitle,
      scorecardDescription,
      scoreCardId,
      memberId
    } = this.props

    const { formData, isFormValid } = this.state

    const { name } = challenge

    return (
      <div className={styles.scorecardPage}>
        <Helmet title={name || 'ScoreCard Details'} />
        <PageHeader title={name} tags={getChallengeTags(challenge, challengeTypes, resources, memberId)} />

        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.leftContent}>
              <Link to={`/challenges/${challenge.id}`}>
                <img src={LeftChevronIcon} className={styles.leftChevron} />
              </Link>
              <div>
                <h3 className={styles.title}>{scorecardTitle}&nbsp;{ editMode ? '' : `(${calculateScore(formData, scorecards)})`}</h3>
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
                formDetails={formData}
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
                  <a onClick={this.onFormSubmit} className={styles.primaryButton}>Save and Submit</a>
                }
              </div>
            </div>
          }
          {
            !isFormValid &&
            <p className={styles.invaidForm}>Cannot submit. One or more sections do not have a score assigned.</p>
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
  savedResponses: PropTypes.arrayOf(PropTypes.object),
  memberId: PropTypes.string.isRequired
}

ScoreCardComponent.defaultProps = {
  challenge: null,
  reviewSummations: [],
  challengeTypes: [],
  resources: {},
  savedResponses: []
}

export default ScoreCardComponent
