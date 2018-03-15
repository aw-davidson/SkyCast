import React from 'react'
import { Input } from 'semantic-ui-react'
import moment from 'moment'
import { connect } from 'react-redux'
import { changeDate } from '../store'
import axios from 'axios'

/**
* COMPONENT
*/
const DateSelect = (props) => {
  const { handleChange, location, userId } = props;
  const locationName = location.name;

  return (
    <div className="date-select">
      <Input
        type="date"
        onChange={(event) => handleChange(event, locationName, userId)}
        min="2000-01-01"
        max={moment().add(7, 'days').format('YYYY-MM-DD')}
      />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    location: state.location,
    userId: state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleChange(event, location, userId) {
      let date = (moment(event.target.value).unix())
      dispatch(changeDate(date))

      location = location || 'Your current location'
      const query = {date, location, userId}
      axios.post(`api/queries`, query)
        .catch(console.error)

    }
  }
}

export default connect(mapState, mapDispatch)(DateSelect)
