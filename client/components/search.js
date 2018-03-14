import React from 'react'
import { connect } from 'react-redux'

class Search extends React.Component {
  componentDidMount() {
    const input = this.search
    const options = { types: ['geocode'] }
    this.search = new window.google.maps.places.Autocomplete(input, options);
  }

  render() {
    return (
      <input ref={(search) => { this.search = search }} className="search" />
    )
  }
}


export default connect(null, null)(Search)
