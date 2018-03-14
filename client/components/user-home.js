import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { GoogleMap, Search, ForeCast } from './'
import DateSelect from './date-select';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email } = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <div className="container">
        <GoogleMap initialPosition={{ lat: 48.87, lng: 2 }} />
        <div className="chart-card">
          <DateSelect />
          <ForeCast />
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
