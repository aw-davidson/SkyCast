import React from 'react'
import { connect } from 'react-redux'
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory'
import { loadForecast } from '../store'
import { Loader, Dimmer, Segment } from 'semantic-ui-react'
import moment from 'moment'

/**
 * COMPONENT
 */
const Graph = (props) => {
  const { dailySummary, hourlyData } = props.forecast
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
                return moment.unix(unixTime).format('h A')
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

const Loading = () => {
  return (
    <Segment basic className="loading-box">
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </Segment>)
}

/**
 * CONTAINER
 */
class ForeCast extends React.Component {

  state = { loading: true };

  /* eslint-disable react/no-did-update-set-state */
  async componentDidUpdate(prevProps) {
    const { loadForecastAsync, location, date } = this.props
    if (prevProps.location !== location || prevProps.date !== date) {
      await loadForecastAsync(location, date)
      this.setState({ loading: false })
    }
  }

  render() {
    return this.state.loading ? <Loading /> : <Graph {...this.props} />
  }
}

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

