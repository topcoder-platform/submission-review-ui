import _ from 'lodash'

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
