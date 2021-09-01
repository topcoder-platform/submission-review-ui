/**
 * Container to render Upload Submission Page
 * Currently handles Final Fix submissions, for Design track challenges only
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { get } from 'lodash'
import PageHeader from '../../components/PageHeader'
import Loader from '../../components/Loader'
import ChallengeInfo from '../../components/ChallengeDetailsComponent/ChallengeInfo'
import Submit from '../../components/Uploads/Submit'
import { getChallengeTags } from '../../util/challenge'
import { loadChallengeDetails, loadChallengeTypes } from '../../actions/challengeDetails'
import { loadChallengeResources, loadResourceRoles } from '../../actions/resources'
import styles from './UploadSubmission.module.scss'

class UploadSubmission extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resourceLoaded: false
    }
  }

  componentDidMount () {
    const {
      loadChallengeDetails,
      challengeId,
      loadChallengeTypes
    } = this.props

    loadChallengeDetails(challengeId)
    loadChallengeTypes()
  }

  render () {
    const {
      challengeDetails,
      challengeTypes,
      resources,
      isLoading,
      loadResourceRoles,
      challengeId,
      loadChallengeResources,
      invalidChallenge,
      auth
    } = this.props
    const { name } = challengeDetails
    const challengeDetailsLink = `/challenges/${challengeId}`

    if (!isLoading && !resources.roles.length && !this.state.resourceLoaded) {
      loadChallengeResources([challengeDetails])
      loadResourceRoles()
      this.setState({ resourceLoaded: true })
    }

    if (!isLoading && invalidChallenge) return <Redirect to='/' />

    const shouldWait = challengeId.toString() !== get(challengeDetails, 'id', '').toString()

    return (isLoading || shouldWait) ? <Loader /> : (
      <>
        <Helmet title={`Upload Submission | ${name}`} />
        <PageHeader title={name} tags={getChallengeTags(challengeDetails, challengeTypes, resources, auth.user.userId.toString())} />
        <div className={styles.container}>
          <ChallengeInfo challenge={challengeDetails} />
          <div className={styles.uploadHeader}>
            <div className={styles.backButton}>
              <Link to={challengeDetailsLink} className='link-button'><FontAwesomeIcon icon={faChevronLeft} /></Link>
            </div>
            <h2 className={styles.heading}>Upload Final Fix Submission</h2>
          </div>
          <Submit
            challengeId={challengeId}
            userId={auth.user.userId.toString()}
            submissionType='Final Fix Submission'
          />
        </div>
      </>
    )
  }
}

UploadSubmission.propTypes = {
  challengeDetails: PropTypes.object,
  challengeTypes: PropTypes.arrayOf(PropTypes.object),
  challengeId: PropTypes.string,
  loadChallengeDetails: PropTypes.func,
  loadChallengeResources: PropTypes.func,
  loadResourceRoles: PropTypes.func,
  loadChallengeTypes: PropTypes.func,
  resources: PropTypes.object,
  isLoading: PropTypes.bool,
  invalidChallenge: PropTypes.bool,
  auth: PropTypes.object
}

const mapStateToProps = ({ auth, challengeDetails, resources }) => ({
  ...challengeDetails,
  resources,
  auth
})

const mapDispatchToProps = {
  loadChallengeDetails,
  loadChallengeResources,
  loadChallengeTypes,
  loadResourceRoles
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadSubmission)
