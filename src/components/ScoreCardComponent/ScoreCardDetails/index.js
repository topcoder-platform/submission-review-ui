/**
 * ScoreCard details component
 */
import _ from 'lodash'
import React, { Component } from 'react'
import styles from './ScoreCardDetails.module.scss'
import ExpandableTable from '../../ExpandableTable'
import SwitchButton from '../../SwitchButton'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import chevronUp from '../../../assets/icons/chevron-up.svg'
import chevronDown from '../../../assets/icons/chevron-down.svg'
import ScoringSelector from '../../ScoringSelector'
import Textarea from '../../Textarea'

class ScoreCardDetails extends Component {
  constructor (props) {
    super(props)
    const { scorecards } = this.props

    const headerOptions = scorecards.map(scorecard => {
      return [
        {
          name: scorecard.title,
          width: 10
        },
        {
          name: 'Weight',
          width: 3
        },
        {
          name: 'Response',
          width: 3
        }
      ]
    })

    this.state = {
      formData: this.props.scorecards.map((scorecard) => {
        const options = scorecard.children.map((item) => {
          const { title, type, description } = item
          return {
            title,
            type,
            value: description.includes('YES'),
            comment: ''
          }
        })
        return options
      }),
      headerToggle: _.fill(new Array(headerOptions.length), false),
      headerOptions,
      bodyToggle: this.props.scorecards.map(scorecard => scorecard.children.map((item) => false))
    }

    this.onToggleSwitch = this.onToggleSwitch.bind(this)
    this.onScoreChange = this.onScoreChange.bind(this)
    this.onCommentChange = this.onCommentChange.bind(this)
  }

  onToggleSwitch (index, scorecardIndex) {
    const { formData } = this.state
    const { onFormChange } = this.props

    const newFormData = formData.map((scorecard, i) => {
      return scorecard.map((item, scorecardId) => {
        if (index === i && scorecardIndex === scorecardId) {
          return {
            ...item,
            value: !item.value
          }
        } else {
          return item
        }
      })
    })

    this.setState({ formData: newFormData })
    onFormChange(newFormData)
  }

  onScoreChange (index, scorecardIndex, value) {
    const { formData } = this.state
    const { onFormChange } = this.props

    const newFormData = formData.map((scorecard, i) => {
      return scorecard.map((item, scorecardId) => {
        if (index === i && scorecardIndex === scorecardId) {
          return {
            ...item,
            value
          }
        } else {
          return item
        }
      })
    })

    this.setState({ formData: newFormData })
    onFormChange(newFormData)
  }

  onCommentChange (index, scorecardIndex, comment) {
    const { formData } = this.state
    const { onFormChange } = this.props

    const newFormData = formData.map((scorecard, i) => {
      return scorecard.map((item, scorecardId) => {
        if (index === i && scorecardIndex === scorecardId) {
          return {
            ...item,
            comment
          }
        } else {
          return item
        }
      })
    })

    this.setState({ formData: newFormData })
    onFormChange(newFormData)
  }

  onToggleTableHeader (index) {
    const { headerToggle } = this.state
    const newHeaderToggle = headerToggle.map((item, i) => i === index ? !item : item)
    this.setState({ headerToggle: newHeaderToggle })
  }

  onToggleBody (index, scorecardIndex) {
    const { bodyToggle } = this.state

    const newBodyToggle = bodyToggle.map((body, i) => {
      return body.map((item, j) => {
        if (i === index && j === scorecardIndex) {
          return !bodyToggle[i][j]
        } else {
          return bodyToggle[i][j]
        }
      })
    })

    this.setState({ bodyToggle: newBodyToggle })
  }

  renderResponse (item, index, scorecardIndex, currentValue) {
    return item.scoreType === 'boolean'
      ? <SwitchButton
        id={uuidv4()}
        text={currentValue.value ? 'Yes' : 'No'}
        checked={currentValue.value}
        onToggle={() => this.onToggleSwitch(index, scorecardIndex)}
      />
      : <ScoringSelector
        maxRating={item.maxRating}
        currentValue={currentValue.value}
        onChange={(value) => this.onScoreChange(index, scorecardIndex, value)}
      />
  }

  render () {
    const { scorecards, editMode } = this.props
    const { formData, headerOptions, headerToggle, bodyToggle } = this.state

    const rows = scorecards.map((scorecard, index) => {
      return scorecard.children.map((item, scorecardIndex) => {
        const currentValue = formData[index][scorecardIndex]
        const isDetailOpened = editMode ? (bodyToggle.length ? bodyToggle[index][scorecardIndex] : false) : true

        return (
          <>
            <ExpandableTable.Row key={uuidv4()}>
              <ExpandableTable.Col width={headerOptions[index][0].width} viewMode={editMode ? null : 'true'}>
                <div className={styles.title} onClick={() => { this.onToggleBody(index, scorecardIndex) }}>
                  <img
                    src={isDetailOpened ? chevronUp : chevronDown}
                    className={styles.icon}
                  />
                  <div className={styles.text}>{item.title}</div>
                </div>
              </ExpandableTable.Col>
              <ExpandableTable.Col width={headerOptions[index][1].width} viewMode={editMode ? null : 'true'}>
                <span className={styles.weight}>{item.weight.toFixed(1)}</span>
              </ExpandableTable.Col>
              <ExpandableTable.Col width={headerOptions[index][2].width} viewMode={editMode ? null : 'true'}>
                {
                  editMode
                    ? this.renderResponse(item, index, scorecardIndex, currentValue)
                    : formData[index][scorecardIndex].weight
                }
              </ExpandableTable.Col>
              {isDetailOpened && (
                editMode
                  ? <ExpandableTable.Col extra='true'>
                    <Textarea
                      onChange={(comment) => this.onCommentChange(index, scorecardIndex, comment)}
                      value={formData[index][scorecardIndex].comment}
                    />
                  </ExpandableTable.Col>
                  : <ExpandableTable.Col extra='true'>
                    <div className={styles.viewMode}>
                      {formData[index][scorecardIndex].comment || 'No comment'}
                    </div>
                  </ExpandableTable.Col>
              )
              }
            </ExpandableTable.Row>
          </>
        )
      })
    })

    return (
      <div className={styles.scoreCardDetail} key={uuidv4()}>
        <ExpandableTable
          headerToggle={headerToggle}
          onToggle={(index) => { this.onToggleTableHeader(index) }}
          rows={rows}
          headerOptions={headerOptions}
          className={styles.scoreCardTable}
          expandable />
      </div>
    )
  }
}

ScoreCardDetails.defaultProps = {
  scorecards: {}
}

ScoreCardDetails.propTypes = {
  scorecards: PropTypes.arrayOf(PropTypes.object),
  onFormChange: PropTypes.func,
  editMode: PropTypes.bool
}

export default ScoreCardDetails
