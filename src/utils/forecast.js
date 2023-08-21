const request = require("request");


const forecast = ({latitude, longitude, location} = {} , callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f5974bd49de2babb31003aed91c37203&query=${latitude},${longitude}&units=m`
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const current = body.current
            callback(undefined, `${current.weather_descriptions[0]}. The temperature is ${current.temperature} degrees C. It feels like ${current.feelslike} degrees C. The humidity is ${current.humidity}%.`)
        }
    })
}

module.exports =  forecast