import _ from 'lodash'
import ChallengeTags from '../components/ChallengeDetailsComponent/ChallengeTags'
import React from 'react'

/**
 * Get roles from resource
 * @param resources
 * @param challengeId challenge id
 */
export const getRolesFromResource = (resources, challengeId) => {
  const foundResources = _.filter(resources.roles, { challengeId })
  let roles = []

  if (foundResources) {
    for (let res of foundResources) {
      const currentRole = _.find(resources.resourceRoles, { id: res.roleId })
      if (currentRole) {
        roles.push(currentRole.name)
      }
    }
  }

  return roles
}

/**
 * Get challenge tags
 * @param challenge
 * @param challengeTypes
 * @param resources
 */
export const getChallengeTags = (challenge, challengeTypes, resources) => {
  return (
    <ChallengeTags
      challenge={challenge}
      challengeTypes={challengeTypes}
      roles={getRolesFromResource(resources, challenge.id)}
    />
  )
}

/**
 * Check if current user has copilot role on it
 * @param challengeId challenge id
 * @param resources
 */
export const isCopilotUser = (challengeId, resources) => {
  const roles = getRolesFromResource(resources, challengeId)

  return roles.includes('Copilot')
}
