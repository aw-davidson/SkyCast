import React from 'react'
import { Input } from 'semantic-ui-react'
import moment from 'moment'
import {connect} from 'react-redux'
import { changeDate } from '../store'


const DateSelect = (props) => {
  const { handleChange } = props;

  return (
    <div className="date-select">
     <Input
        type="date"
        onChange={handleChange}
        min="2000-01-01"
        max={moment().add(7, 'days').format('YYYY-MM-DD')}
      />
    </div>
  )
}

const mapDispatch = (dispatch) => {
  return {
    handleChange(event){
      let timeStamp = ( moment(event.target.value).unix() )
      dispatch(changeDate(timeStamp))
    }
  }
}

export default connect(null, mapDispatch)(DateSelect)
