const request = require('request')

const getForecast = (longitude, latitude, callback) => {
    const darkSkyURL = `https://api.darksky.net/forecast/6192d9aca9b556b3ca28633403278e0e/${latitude},${longitude}`
    request({ url: darkSkyURL, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location!');
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = { getForecast }