import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_QUERIES = 'GET_QUERIES'

/**
 * INITIAL STATE
 */
const defaultQueries = []

/**
 * ACTION CREATORS
 */
const getQueries = queries => ({type: GET_QUERIES, queries})

/**
 * THUNK CREATORS
 */
export const loadQueries = (userId) =>
  dispatch =>
    axios.get(`/api/queries?userId=${userId}`)
      .then(res => {
        dispatch(getQueries(res.data))
      })
      .catch(err => console.error(err))

/**
 * REDUCER
 */
export default function (state = defaultQueries, action) {
  switch (action.type) {
    case GET_QUERIES:
      return action.queries
    default:
      return state
  }
}
