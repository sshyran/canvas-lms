/*
 * Copyright (C) 2018 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import {combineReducers} from 'redux'
import {
  SET_CSP_ENABLED,
  SET_CSP_ENABLED_OPTIMISTIC,
  ADD_DOMAIN,
  ADD_DOMAIN_OPTIMISTIC,
  ADD_DOMAIN_BULK,
  REMOVE_DOMAIN,
  REMOVE_DOMAIN_OPTIMISTIC
} from './actions'

export function cspEnabled(state = false, action) {
  switch (action.type) {
    case SET_CSP_ENABLED:
    case SET_CSP_ENABLED_OPTIMISTIC:
      return action.payload
    default:
      return state
  }
}

export function whitelistedDomains(state = {account: [], effective: [], tools: []}, action) {
  switch (action.type) {
    case ADD_DOMAIN:
    case ADD_DOMAIN_OPTIMISTIC: {
      const newState = {...state}
      Object.keys(action.payload).forEach(domainType => {
        const uniqueDomains = new Set(state[domainType])
        uniqueDomains.add(action.payload[domainType])
        newState[domainType] = Array.from(uniqueDomains)
      })
      return newState
    }
    case ADD_DOMAIN_BULK: {
      const newState = {...state}
      Object.keys(action.payload).forEach(domainType => {
        const uniqueDomains = new Set(state[domainType])
        action.payload[domainType].forEach(x => uniqueDomains.add(x))
        newState[domainType] = Array.from(uniqueDomains)
      })
      return newState
    }
    case REMOVE_DOMAIN:
    case REMOVE_DOMAIN_OPTIMISTIC: {
      const newState = {...state}
      newState.account = newState.account.filter(domain => domain !== action.payload)
      return newState
    }
    default:
      return state
  }
}

export default combineReducers({
  cspEnabled,
  whitelistedDomains
})
