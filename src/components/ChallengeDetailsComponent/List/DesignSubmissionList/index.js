import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PT from 'prop-types'
import cn from 'classnames'
import moment from 'moment'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Handle from '../../../Handle'
import NoSubmissions from '../NoSubmissions'
import dragDots from '../../../../assets/icons/drag-dots.svg'
import menuDots from '../../../../assets/icons/menu-dots.svg'
import badgeFirstPlace from '../../../../assets/images/badge-first-place.png'
import badgeSecondPlace from '../../../../assets/images/badge-second-place.png'
import badgeThirdPlace from '../../../../assets/images/badge-third-place.png'
import { SET_CHALLENGE_SUBMISSION_PLACE, SUBMISSION_TYPES } from '../../../../config/constants'
import { computeDesignSubmissionScore } from '../../../../util/submission'
import styles from './DesignSubmissionList.module.scss'

const badges = [
  badgeFirstPlace,
  badgeSecondPlace,
  badgeThirdPlace
]

class DesignSubmissionList extends React.Component {
  constructor (props) {
    super(props)
    this.onDragEnd = this.onDragEnd.bind(this)

    // Only consider Contest Submissions
    this.state = {
      contestSubmissions: this.props.submissions.filter(s => s.type === SUBMISSION_TYPES.CONTEST_SUBMISSION)
    }
  }

  onDragEnd (result) {
    if (!result.destination) {
      return
    }
    this.props.dispatch({
      type: SET_CHALLENGE_SUBMISSION_PLACE,
      startIndex: result.source.index,
      endIndex: result.destination.index
    })
  }

  render () {
    const {
      canSortItems,
      challengeId,
      dispatch,
      placeCount
    } = this.props
    const { contestSubmissions } = this.state
    if (!contestSubmissions.length) {
      return <NoSubmissions />
    }
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId={challengeId}>
          {(provided, snapshot) => (
            <table className={styles.container} ref={provided.innerRef}>
              <thead>
                <tr>
                  <th className={styles.submissionId}>Submission id</th>
                  <th className={styles.reviewDate}>Review Date</th>
                  <th className={styles.score}>Score</th>
                  <th className={styles.menu} />
                </tr>
              </thead>
              <tbody>
                {contestSubmissions.map((item, index) => (
                  <SubmissionItem
                    key={item.id}
                    canSortItems={canSortItems}
                    challengeId={challengeId}
                    dispatch={dispatch}
                    index={index}
                    item={item}
                    placeCount={placeCount}
                  />
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

DesignSubmissionList.propTypes = {
  canSortItems: PT.bool.isRequired,
  challengeId: PT.string.isRequired,
  dispatch: PT.func.isRequired,
  placeCount: PT.number.isRequired,
  submissions: PT.arrayOf(PT.object)
}

const mapStateToProps = ({ challengeSubmissions }) => ({
  canSortItems: !challengeSubmissions.hasSubmittedReviews
})

export default connect(mapStateToProps)(DesignSubmissionList)

const makeDraggableStyle = (isDragging, draggableStyle) =>
  isDragging ? { ...draggableStyle, display: 'table' } : draggableStyle

class SubmissionItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isMenuOpen: false
    }
    this.moveToIndex = this.moveToIndex.bind(this)
    this.onClickOutsideMenu = this.onClickOutsideMenu.bind(this)
    this.onMenuBtnClick = this.onMenuBtnClick.bind(this)
    this.onMoveToIndex = this.onMoveToIndex.bind(this)
  }

  moveToIndex (endIndex) {
    this.props.dispatch({
      type: SET_CHALLENGE_SUBMISSION_PLACE,
      startIndex: this.props.index,
      endIndex
    })
  }

  onClickOutsideMenu () {
    this.setState({ isMenuOpen: false })
  }

  onMenuBtnClick () {
    this.setState({ isMenuOpen: true })
  }

  onMoveToIndex (index) {
    this.setState({ isMenuOpen: false })
    this.moveToIndex(index)
  }

  render () {
    const { isMenuOpen } = this.state
    const {
      canSortItems,
      challengeId,
      index,
      item,
      placeCount = 3
    } = this.props
    const { createdBy, id, memberHandleColor, review } = item
    const hasReview = review && review[0]
    const reviewDate = hasReview
      ? moment(review[0].updated || review[0].created).format('MMM DD, HH:mma') + ' EST'
      : 'N/A'
    const score = hasReview && typeof review[0].score === 'number'
      ? review[0].score
      : computeDesignSubmissionScore(index)
    return (
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <tr
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={makeDraggableStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <td className={styles.submissionId}>
              <img
                {...provided.dragHandleProps}
                className={cn(
                  styles.dragHandle,
                  { [styles.hidden]: !canSortItems }
                )}
                src={dragDots}
              />
              <span className={styles.submissionLinkPlaceholder}>
                <Link
                  className={styles.submissionLink}
                  to={`/challenges/${challengeId}/submissions/${id}`}
                >
                  {id}
                </Link>
              </span>
              <span className={styles.handlePlaceholder}>
                {createdBy && (
                  <>
                  &nbsp;(<span className={styles.handle}>
                    <Handle handle={createdBy} color={memberHandleColor} />
                  </span>)
                  </>
                )}
                {index < Math.min(placeCount, badges.length) && (
                  <img className={styles.submissionBadge} src={badges[index]} />
                )}
              </span>
            </td>
            <td className={styles.reviewDate}>
              <span className={styles.reviewDatePlaceholder}>{reviewDate}</span>
            </td>
            <td className={styles.score}>{score.toFixed(2)}</td>
            <td className={styles.menu}>
              <div
                className={cn(
                  styles.menuContainer,
                  { [styles.hidden]: !canSortItems }
                )}
              >
                <img
                  className={styles.menuBtn}
                  src={menuDots}
                  onClick={isMenuOpen ? null : this.onMenuBtnClick}
                />
                {isMenuOpen && (
                  <MenuPopover
                    moveToIndex={this.onMoveToIndex}
                    onClickOutside={this.onClickOutsideMenu}
                    placeCount={placeCount}
                  />
                )}
              </div>
            </td>
          </tr>
        )}
      </Draggable>
    )
  }
}

SubmissionItem.propTypes = {
  canSortItems: PT.bool.isRequired,
  challengeId: PT.string.isRequired,
  dispatch: PT.func.isRequired,
  index: PT.number.isRequired,
  item: PT.shape({
    id: PT.oneOfType([PT.number, PT.string]).isRequired,
    createdBy: PT.string,
    review: PT.array
  }).isRequired,
  placeCount: PT.number
}

class MenuPopover extends React.Component {
  constructor (props) {
    super(props)
    this.containerRef = React.createRef()
    this.moveToFirstPlace = this.moveToFirstPlace.bind(this)
    this.moveToSecondPlace = this.moveToSecondPlace.bind(this)
    this.moveToThirdPlace = this.moveToThirdPlace.bind(this)
    this.onClickOutside = this.onClickOutside.bind(this)
    this.removeAsWinner = this.removeAsWinner.bind(this)
    this.setAsRunnerUp = this.setAsRunnerUp.bind(this)
  }

  moveToFirstPlace () {
    this.props.moveToIndex(0)
  }

  moveToSecondPlace () {
    this.props.moveToIndex(1)
  }

  moveToThirdPlace () {
    this.props.moveToIndex(2)
  }

  removeAsWinner () {
    this.props.moveToIndex(Infinity)
  }

  setAsRunnerUp () {
    this.props.moveToIndex(this.props.placeCount)
  }

  onClickOutside (event) {
    const container = this.containerRef.current
    if (container && !container.contains(event.target)) {
      this.props.onClickOutside()
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.onClickOutside, false)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.onClickOutside, false)
  }

  render () {
    const { placeCount = 3 } = this.props
    return (
      <div className={styles.menuPopover} ref={this.containerRef}>
        <div className={styles.menuLabel}>Select Winner</div>
        <div className={styles.menuItem} onClick={this.moveToFirstPlace}>
          <span className={styles.menuItemText}>1st Place</span>
        </div>
        {placeCount > 1 && (
          <div className={styles.menuItem} onClick={this.moveToSecondPlace}>
            <span className={styles.menuItemText}>2nd Place</span>
          </div>
        )}
        {placeCount > 2 && (
          <div className={styles.menuItem} onClick={this.moveToThirdPlace}>
            <span className={styles.menuItemText}>3rd Place</span>
          </div>
        )}
        <div className={styles.menuItem} onClick={this.setAsRunnerUp}>
          Runner Up
        </div>
        <div
          className={cn(styles.menuItem, styles.menuItemAttention)}
          onClick={this.removeAsWinner}
        >
          Remove as Winner
        </div>
      </div>
    )
  }
}

MenuPopover.propTypes = {
  moveToIndex: PT.func.isRequired,
  onClickOutside: PT.func.isRequired,
  placeCount: PT.number.isRequired
}
