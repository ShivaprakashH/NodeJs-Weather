const request = require("postman-request")

const forecast = (longitude, latitude, callback) => {
    const urlParam = latitude + ", " + longitude
    const url = 'http://api.weatherstack.com/current?access_key=a9bdea74c6a7ebb03f953eb5f7d3dead&query=' + encodeURIComponent(urlParam) + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to weatehr service', undefined)
        } else if (body.error) {
            callback('Please enter valid location', undefined)
        } else {
            callback(undefined, body.current)
        }
    })
}

const forecastWithName = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a9bdea74c6a7ebb03f953eb5f7d3dead&query=' + encodeURIComponent(address) + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to weatehr service', undefined)
        } else if (body.error) {
            callback('Please enter valid location', undefined)
        } else {
            callback(undefined, body.current)
        }
    })
}

module.exports = {
    forecast: forecast,
    forecastWithName: forecastWithName
}