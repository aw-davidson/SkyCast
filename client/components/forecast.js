import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory'
import { loadForecast } from '../store'
import { Loader, Dimmer, Segment } from 'semantic-ui-react'

/**
 * COMPONENT
 */
class ForeCast extends React.Component {

  state = { loading: true };

  async componentDidUpdate(prevProps) {
    const { loadForecastAsync, location, date } = this.props
    if (prevProps.location !== location || prevProps.date !== date) {
      await loadForecastAsync(location, date)
      this.setState({ loading: false })
    }
  }

  formatAMPM(unixTime) {
    const date = new Date(unixTime)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ' ' + ampm;
    return strTime;
  }

  renderLoading() {
    return (
      <Segment basic className="loading-box">
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Segment>)
  }

  renderGraph() {
    const { dailySummary, hourlyData } = this.props.forecast
    return (
      <Segment className="chart-segment" basic>
        {
          hourlyData &&
          <div className="chart-summary">
            <VictoryChart
              theme={VictoryTheme.material}
              width={600}
              height={300}
            >
              <VictoryAxis
                tickFormat={(unixTime) => {
                  let date = new Date(unixTime * 1000)
                  return date.toLocaleString('en-US', { hour: 'numeric', hour12: true })
                }}
                tickCount={8}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(degrees) => `${degrees}°F`}
              />
              <VictoryLine
                interpolation="natural"
                data={hourlyData}
                x="time"
                y="temperature"
              />
            </VictoryChart>
            <p className="summary-text">{dailySummary}</p>
          </div>
        }
      </Segment>
    )
  }

  render() {
    return this.state.loading ? this.renderLoading() : this.renderGraph()
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    location: state.location,
    forecast: state.forecast,
    date: state.date
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadForecastAsync(location, date) {
      dispatch(loadForecast(location, date))
    }
  }
}


export default connect(mapState, mapDispatch)(ForeCast)

/**
 * PROP TYPES
 */

