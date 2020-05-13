const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a9bdea74c6a7ebb03f953eb5f7d3dead&query=' + encodeURIComponent(address) + '&units=f'
    request({url, json: true},(errorCall, {temperature, feelslike, error}) => {
        if (errorCall) {
            callback('unable to connect to weatehr service', undefined)
        } else if (error) {
            callback('Please enter valid location', undefined)
        } else {
            callback(undefined,{
                latitude: temperature,
                longitude: feelslike,
                location: address
            })
        }
    })
}

module.exports = geocode