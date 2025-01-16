/**
 * Component to define routes of the app
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import renderApp from './components/App'
import TopBarContainer from './containers/TopbarContainer'
import Sidebar from './components/Sidebar'
import MyChallenges from './containers/MyChallenges'
import ChallengeDetails from './containers/ChallengeDetails'
import ScoreCard from './containers/ScoreCard'
import UploadSubmission from './containers/UploadSubmission'
import { getFreshToken } from 'tc-auth-lib'
import { ACCOUNTS_APP_LOGIN_URL } from './config/constants'
import { saveToken } from './actions/auth'
import { connect } from 'react-redux'

class Routes extends React.Component {
  componentWillMount () {
    this.checkAuth()
  }

  checkAuth () {
    // try to get a token and redirect to login page if it fails
    getFreshToken().then((token) => {
      this.props.saveToken(token)
    }).catch((error) => {
      console.error(error)
      const redirectBackToUrl = window.location.origin + window.location.pathname
      window.location = ACCOUNTS_APP_LOGIN_URL + '?retUrl=' + redirectBackToUrl
    })
  }

  render () {
    if (!this.props.isLoggedIn) {
      return null
    }

    return (
      <Switch>
        <Route exact path='/' render={renderApp(<MyChallenges />, <TopBarContainer />, <Sidebar />)} />
        <Route exact path='/challenges/:challengeId([\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}|\d{5,8})'
          render={({ match }) => renderApp(
            <ChallengeDetails challengeId={match.params.challengeId} />,
            <TopBarContainer />,
            <Sidebar />
          )()} />
        <Route exact path='/challenges/:challengeId([\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}|\d{5,8})/submissions/:submissionId'
          render={({ match }) => renderApp(
            <ChallengeDetails challengeId={match.params.challengeId} submissionId={match.params.submissionId} />,
            <TopBarContainer />,
            <Sidebar />
          )()} />
        <Route exact path='/challenges/:challengeId([\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}|\d{5,8})/submissions/:submissionId/scorecards/:scoreCardId'
          render={({ match }) => renderApp(
            <ScoreCard challengeId={match.params.challengeId} submissionId={match.params.submissionId} scoreCardId={match.params.scoreCardId} />,
            <TopBarContainer />,
            <Sidebar />
          )()} />
        <Route exact path='/challenges/:challengeId([\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}|\d{5,8})/submit'
          render={({ match }) => renderApp(
            <UploadSubmission challengeId={match.params.challengeId} />,
            <TopBarContainer />,
            <Sidebar />
          )()} />
        {/* If path is not defined redirect to landing page */}
        <Redirect to='/' />
      </Switch>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  ...auth
})

const mapDispatchToProps = {
  saveToken
}

Routes.propTypes = {
  saveToken: PropTypes.func,
  isLoggedIn: PropTypes.bool
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))
