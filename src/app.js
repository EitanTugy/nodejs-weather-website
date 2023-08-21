// const weatherData = require('./../../weather-app/app')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// // console.log(__filename)
// console.log(path.join(__dirname, `../public`))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, `../public`)
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Eitan Tugy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Eitan Tugy'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Eitan Tugy'
    })

})

app.get('/Weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    const address = req.query.address
    geocode(address, (error, data) => {
        if(error){
            return res.send({ error })
        }
        forecast(data, (error, forcast_data) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                location: data.location,
                forecast: forcast_data
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Eitan Tugy',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Eitan Tugy',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})