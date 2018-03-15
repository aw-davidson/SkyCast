import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_FORECAST = 'GET_FORECAST'

/**
 * INITIAL STATE
 */
const defaultForecast = {}

/**
 * ACTION CREATORS
 */
const getForecast = forecast => ({type: GET_FORECAST, forecast})

/**
 * THUNK CREATORS
 */
export const loadForecast = (location, date) =>
  dispatch =>
    axios.get(`/api/forecast/${location.lat},${location.lng},${date}`)
      .then(res => {
        dispatch(getForecast(res.data))
      })
      .catch(err => console.error(err))

/**
 * REDUCER
 */
export default function (state = defaultForecast, action) {
  switch (action.type) {
    case GET_FORECAST:
      return action.forecast
    default:
      return state
  }
}
