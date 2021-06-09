/**
 * Component to render challenge details and submission details pages
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import PageHeader from '../PageHeader'
import Table from '../Table'
import styles from './ScoreCardComponent.module.scss'

// Table options for scorecard
const options = [
  {
    name: 'Score Card Id',
    width: 16
  },
  {
    name: 'Created By',
    width: 35
  },
  {
    name: 'Reviewed Date',
    width: 13
  },
  {
    name: 'isPassing',
    width: 11
  },
  {
    name: 'Aggregate Score',
    width: 17
  }
]

const ScoreCardComponent = ({ reviewSummations, scoreCardId, challengeId }) => {
  const rows = reviewSummations.map((s, i) => {
    return (
      <Table.Row key={`item-${i}`} className={styles.item}>
        <Table.Col width={options[0].width}>
          <span className={styles.cell}>{s.id}</span>
        </Table.Col>
        <Table.Col width={options[0].width}>
          <span className={styles.cell}>{s.createdBy}</span>
        </Table.Col>
        <Table.Col width={options[0].width}>
          <span className={styles.cell}>{moment(s.reviewedDate).format('MMM DD, HH:mma')}</span>
        </Table.Col>
        <Table.Col width={options[0].width}>
          <span className={styles.cell}>{s.isPassing ? 'True' : 'False'}</span>
        </Table.Col>
        <Table.Col width={options[0].width}>
          <span className={styles.cell}>{s.aggregateScore}</span>
        </Table.Col>
      </Table.Row>
    )
  })

  return (
    <div>
      <Helmet title={'ScoreCard Details'} />
      <PageHeader title={'ScoreCard Details'} />
      <h3 className={styles.title}>Challenge Id: <span>{challengeId}</span></h3>
      <h3 className={styles.title}>ScoreCard Id: <span>{scoreCardId}</span></h3>
      <div className={styles.scorecard}>
        <Table rows={rows} options={options} className={styles.list} />
      </div>
    </div>
  )
}

ScoreCardComponent.propTypes = {
  reviewSummations: PropTypes.arrayOf(PropTypes.object),
  scoreCardId: PropTypes.string,
  challengeId: PropTypes.string
}

ScoreCardComponent.defaultProps = {
  reviewSummations: []
}

export default ScoreCardComponent
