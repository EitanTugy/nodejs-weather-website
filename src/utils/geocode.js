const request = require('request')
const geocode = (address, callback) => {
    if(!address){
        callback('You didn\'t provide a valid location name!', undefined)
    }
    else {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZWl0YW4tdHUiLCJhIjoiY2xsZjBpYjVjMHg1djNja2FubHk4cmltYyJ9.tfOa6NyCI1OG99uOK8KgUw&limit=1`
        request({url, json: true}, (error, {body}) => {
            if (error) {
                callback('Unable to connect to location services!', undefined)
            } else if (body.features.length === 0) {
                if(!body.query[0]){
                    callback(`Couldn't find location.`, undefined)
                } else{
                    callback(`Couldn't find ${body.query[0]} location.`, undefined)
                }
            } else {
                const geo = body.features[0]

                callback(undefined, {
                    latitude: geo.center[1],
                    longitude: geo.center[0],
                    location: geo.place_name
                })
            }
        })
    }
}

module.exports = geocode