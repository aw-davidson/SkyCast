/**
 * ACTION TYPES
 */
const CHANGE_LOCATION = 'CHANGE_LOCATION'


/**
 * INITIAL STATE
 */
const initialLocation = {}

/**
 * ACTION CREATORS
 */
export const changeLocation = location => ({type: CHANGE_LOCATION, location})

/**
 * REDUCER
 */
export default function (state = initialLocation, action) {
  switch (action.type) {
    case CHANGE_LOCATION:
      return action.location
    default:
      return state
  }
}
