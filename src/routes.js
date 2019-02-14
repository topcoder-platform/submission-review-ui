/**
 * Component to define routes of the app
 */
import React from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import renderApp from './components/App'
import TopBarContainer from './containers/TopbarContainer'
import Sidebar from './components/Sidebar'
import MyChallenges from './containers/MyChallenges'
import ChallengeDetails from './containers/ChallengeDetails'

const routes = function () {
  return (
    <Switch>
      <Route exact path='/' render={renderApp(<MyChallenges />, <TopBarContainer />, <Sidebar />)} />
      <Route exact path='/challenges/:challengeId(\d{8}|\d{5})'
        render={({ match }) => renderApp(
          <ChallengeDetails challengeId={match.params.challengeId} />,
          <TopBarContainer />,
          <Sidebar />
        )()} />
      <Route exact path='/challenges/:challengeId(\d{8}|\d{5})/submissions/:submissionId'
        render={({ match }) => renderApp(
          <ChallengeDetails challengeId={match.params.challengeId} submissionId={match.params.submissionId} />,
          <TopBarContainer />,
          <Sidebar />
        )()} />
      {/* If path is not defined redirect to landing page */}
      <Redirect to='/' />
    </Switch>
  )
}

export default withRouter(routes)
