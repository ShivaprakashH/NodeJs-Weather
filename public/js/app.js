console.log('This is client side JS: Loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             return console.log(data.error)
//         } 
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = "test"
// messageTwo.textContent = "test1"

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageTwo.textContent = ''
    messageOne.textContent = 'Loading ...'
    const fetchUrl = 'http://localhost:3000/weather?address=' + searchValue.value
    fetch(fetchUrl).then((response) => {
        response.json().then((data) => {
            if (data.Error) {
                messageOne.textContent = data.Error
                
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.Forecast
            }
             
        })
    })
})