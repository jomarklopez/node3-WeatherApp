console.log('Client side javascript is loaded!')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const forecastRender = document.querySelector('#forecast')

const locationRender = document.querySelector('#location')

// Clears the content of the search field, and the message paragraphs
const clear = () => {
    locationRender.textContent = ''
    forecastRender.textContent = ''
    search.value = ''
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Clear search input after storing value
    const location = search.value
    clear()

    // Render loading
    forecastRender.insertAdjacentHTML('afterbegin', `Loading...`)

    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        response.json().then(data => {
            // Render error if there is one
            if (data.error) {
                clear()
                forecastRender.insertAdjacentHTML('afterbegin', `${data.error}`)
            } else {
                // Render the results
                locationRender.insertAdjacentHTML('afterbegin', `Location: ${data.location}`)
                forecastRender.insertAdjacentHTML('afterbegin', `Weather forecast for today is:\n${data.forecast}`)
            }
        })
    })
})