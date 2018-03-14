import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadQueries } from '../store'

/**
 * COMPONENT
 */
class Queries extends React.Component {

  componentDidMount() {
    this.props.loadQueriesAsync(this.props.userId)
  }

  render() {
    const { queries } = this.props
    return (
      <div>
        {
          queries && queries.map((query) => {
            return <h2 key={query.id}>{query.location}</h2>
          })
        }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    queries: state.queries,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadQueriesAsync(userId) {
      dispatch(loadQueries(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Queries)
