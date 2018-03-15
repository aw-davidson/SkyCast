import React from 'react'
import { connect } from 'react-redux'
import { loadQueries } from '../store'
import moment from 'moment'
import { Table } from 'semantic-ui-react'

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
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Search Date</Table.HeaderCell>
            <Table.HeaderCell>Searched at</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            queries && queries.map((query) => {
              return (
                <Table.Row key={query.id}>
                  <Table.Cell>{query.location}</Table.Cell>
                  <Table.Cell>{moment.unix(query.date).format('YYYY-MM-DD')}</Table.Cell>
                  <Table.Cell>{moment(query.createdAt).format('YYYY-MM-DD, h:mm:ss a')}</Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
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
