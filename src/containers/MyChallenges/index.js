/**
 * Container to render My Challenges page
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MyChallengesComponent from '../../components/MyChallengesComponent'
import { loadChallenges } from '../../actions/challenges'
import { loadChallengeResources, loadResourceRoles } from '../../actions/resources'

class MyChallenges extends Component {
  componentDidMount () {
    this.props.loadChallenges()
  }

  render () {
    const { challenges, isLoading } = this.props

    return (
      <MyChallengesComponent
        challenges={challenges}
        isLoading={isLoading}
      />
    )
  }
}

MyChallenges.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  loadChallenges: PropTypes.func
}

const mapStateToProps = ({ challenges, resources }) => ({
  ...challenges,
  resources
})

const mapDispatchToProps = {
  loadChallenges,
  loadChallengeResources,
  loadResourceRoles
}

export default connect(mapStateToProps, mapDispatchToProps)(MyChallenges)
