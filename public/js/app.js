console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('.weather-form')
const searsh = document.querySelector('input')
const mesageOne = document.querySelector('#message-1')
const mesageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    mesageOne.textContent = 'Loading ...'
    mesageTwo.textContent = ''

    const location = searsh.value
    if(!location) return mesageOne.textContent = "You must enter a location"
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) mesageOne.textContent = data.error
            else {
                mesageOne.textContent = data.location
                mesageTwo.textContent = data.forecast
            }
        })
    })
})