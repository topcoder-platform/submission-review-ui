/**
 * Component to render submissions of Marathon Matches
 */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Table from '../../../Table'
import styles from './MMSubmissionList.module.scss'
import Handle from '../../../Handle'

// Table options for non MM matches
const options = [
  {
    name: 'Rank',
    width: 2
  },
  {
    name: 'Competitor',
    width: 6
  },
  {
    name: 'Time',
    width: 6
  },
  {
    name: 'Final',
    width: 5
  },
  {
    name: 'Provisional',
    width: 3
  }
]

const expandableOptions = [
  {
    name: 'Submission'
  },
  {
    name: 'Final'
  },
  {
    name: 'Provisonal'
  },
  {
    name: 'Time'
  }
]

class MMSubmissionList extends React.Component {
  constructor (props) {
    super(props)
    this.toggleRow = this.toggleRow.bind(this)

    this.state = {
      expandStates: {}
    }
  }

  toggleRow (submitterId) {
    const { expandStates } = this.state
    this.setState({
      expandStates: { ...expandStates, [submitterId]: !expandStates[submitterId] }
    })
  }

  renderExpandButton (submitterId, onClick) {
    const { expandStates } = this.state
    const isExpanded = !!expandStates[submitterId]
    const rotation = isExpanded ? 90 : null
    return (
      <FontAwesomeIcon
        icon={faChevronRight}
        className={styles.expandButton}
        rotation={rotation}
        onClick={onClick}
      />
    )
  }

  renderExpandableRows (submissions) {
    const { challengeId } = this.props
    const headers = expandableOptions.map(o => (
      <th key={`expandable-row-header-${o.name}`}>{o.name}</th>)
    )
    const getFormattedTime = (time) => moment(time).format('DD MMM YYYY, HH:mm:ss')
    const rows = submissions.map(
      s => (
        <tr className={styles.expandableContentRow} key={`expanded-row-${s.submissionId}`}>
          <td />
          <td>
            <Link className={styles.submissionLink} to={`/challenges/${challengeId}/submissions/${s.submissionId}`}>
              {s.submissionId}
            </Link>
          </td>
          <td>
            <span>{s.finalScore || '-'}</span>
          </td>
          <td>
            <span>{s.provisionalScore || '-'}</span>
          </td>
          <td>
            <span className={styles.date}>{getFormattedTime(s.submissionTime)}</span>
          </td>
        </tr>
      )
    )
    return <>
      <tr className={styles.expandableContentRow}>
        <th />
        {headers}
      </tr>
      {rows}
    </>
  }

  render () {
    const { submissions, challengeId } = this.props
    const { expandStates } = this.state
    const rows = submissions.map(
      (s, i) => {
        const submission = s.submissions[0]
        const { submissionTime, finalScore, provisionalScore } = submission
        const reviewDate = moment(submissionTime).format('MMM DD, HH:mma')
        const rank = i + 1 // Submissions are sorted by rank
        const expandButton = this.renderExpandButton(s.submitterId, () => this.toggleRow(s.submitterId))
        const expandRows = this.renderExpandableRows(s.submissions)
        return (
          <Table.ExpandableRow
            key={`mm-submission-${s.submitterId}-${i}-${challengeId}`}
            className={styles.item}
            expanded={expandStates[s.submitterId]}
            expandRows={expandRows}
          >
            <Table.Col width={options[0].width}>
              <span className={styles.rank}>-/{rank}</span>
            </Table.Col>
            <Table.Col width={options[1].width}>
              <div className={styles.handle}>
                <Handle handle={s.submitter} color={s.color} />
              </div>
            </Table.Col>
            <Table.Col width={options[2].width}>
              <span className={styles.date}>{reviewDate}</span>
            </Table.Col>
            <Table.Col width={options[3].width}>
              <span>{finalScore || '-'}</span>
            </Table.Col>
            <Table.Col width={options[4].width}>
              <span className={styles.provisionalScore}>{provisionalScore || '-'}</span>
              {expandButton}
            </Table.Col>
          </Table.ExpandableRow>
        )
      }
    )
    return (
      <Table rows={rows} options={options} className={styles.list} expandable />
    )
  }
}

MMSubmissionList.propTypes = {
  submissions: PropTypes.arrayOf(PropTypes.object),
  challengeId: PropTypes.number
}

export default MMSubmissionList
