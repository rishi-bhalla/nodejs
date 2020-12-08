/*console.log('Client side javascript file is loaded');

fetch('http://puzzle.mead.io/puzzle').then(response => {
    response.json().then(data => {
        console.log(data);
    });
}).catch(error => {
    console.log('Error:', error);
});
*/


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = '';
    messageTwo.textContent = '';

    const location = search.value;
    if (typeof location !== 'undefined' && location.length == 0) {
        messageOne.textContent = 'Please enter a valid location!';
        return;
    }

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if(data.error) {
                messageOne.textContent = data.error;
                return;
            }

            messageOne.textContent = data.location;
            messageTwo.textContent = data.foreCast;
        });
    }).catch(error => {
        console.log('Error:', error);
        return;
    });
});