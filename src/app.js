const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Defining Paths for the Express configurations
const publicDirectory = path.join(__dirname, '../public')
const viewDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

// Setting Up the Handlebars Engine and Views location
app.set('view engine', 'hbs')
app.set('views', viewDirectory)
hbs.registerPartials(partialsDirectory)

// Settting up static directory path
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    //Name in the parameter should match with hbs file
    res.render('index', {
        title: 'Weather from HBS',
        name: 'Shiva'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About from HBS',
        name: 'Shiva P'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help from HBS',
        name: 'Shiva P',
        message: 'This is some helpful text'
    })
})
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Shiva',
//         age: 34
//     }, {
//         name: 'Swarna',
//         age: 32
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page for Express<h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            Error: 'Address is a required field'
        })
    }

    geocode(req.query.address, (error, {location} = {}) => {
        console.log('This is Geocode Call')
        if (error) {
            return res.send({
                Error: 'Address has some problem'
            })
        }
        forecast.forecastWithName(location, (error, {weather_descriptions, temperature, feelslike, precip} = {}) => {
            console.log('This is forecast Call')
            if (error) {
                return res.send({
                    Error: 'Address has some problem'
                })
            }
            res.send({
                location,
                Forecast: weather_descriptions[0] + ' It is currently ' +  temperature + ' degrees out. It feels like ' + feelslike + ' degrees out. It has ' + precip*100 + '% chances of rain',
                Address: req.query.address
            })
        })
    })
    
    // res.send({
    //     Forcast: '50 degree farenheat',
    //     Location: 'Philadelphia',
    //     Address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No search found, Please provide one'
        })
    
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', { 
        title: 'Help Error Page',
        name: 'Shiva P',
        errormessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Page',
        name: 'Shiva P',
        errormessage: 'Page you are trying to reach does not exist'
    })
})

app.listen(port, () => {
    console.log('server is running on port ' + port)
})