const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/:latlongtime', (req, res, next) => {
  const [latitude, longitude, time] = req.params.latlongtime.split(',')

  if (time) {
    axios.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${latitude},${longitude},${time}`)
      .then(entireForecast => {
        const forecast = {
          dailySummary: entireForecast.data.daily.data[0].summary,
          hourlyData: entireForecast.data.hourly.data
        }
        res.json(forecast)
      })
      .catch(next)
  } else {
    axios.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${latitude},${longitude}`)
      .then(entireForecast => {
        const forecast = {
          dailySummary: entireForecast.data.daily.summary,
          hourlyData: entireForecast.data.hourly.data
        }
        res.json(forecast)
      })
      .catch(next)
  }
})
