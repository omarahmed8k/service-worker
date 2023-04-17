// Service Worker registration
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./sw.js')
//         .then(function (registration) {
//             console.log('[Service Worker] registration successful with scope: ', registration.scope);
//         })
//         .catch(function (err) {
//             console.log('[Service Worker] registration failed: ', err);
//         });
// }

// Service Worker registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw-api.js')
        .then(function (registration) {
            console.log('[Service Worker] registration successful with scope: ', registration.scope);
        })
        .catch(function (err) {
            console.log('[Service Worker] registration failed: ', err);
        });
}

// Web Worker registration
// document.addEventListener('DOMContentLoaded', () => {
//     const worker = new Worker('./worker.js');
//     worker.postMessage('Hello from main to worker');
//     worker.onmessage = (e) => {
//         console.log(e.data)
//     }
// })

const number = document.querySelector('.number');
const button = document.querySelector('.button');
const result = document.querySelector('.result');

button.addEventListener('click', () => {
    navigator.serviceWorker.controller.postMessage(number.value);
})

navigator.serviceWorker.onmessage = (e) => {
    result.innerHTML = e.data;
    number.value = 0;
}