const weatherForm = document.querySelector('.weather-form')
const search = document.querySelector('input')
const mesageOne = document.querySelector('#message-1')
const mesageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    mesageOne.textContent = 'Loading ...'
    mesageTwo.textContent = ''

    const location = search.value
    if(!location) return mesageOne.textContent = "You must enter a location"
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) mesageOne.textContent = data.error
            else {
                mesageOne.textContent = data.location
                mesageTwo.textContent = data.forecast
            }
        })
    })
})