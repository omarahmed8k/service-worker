// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./sw.js')
//         .then(function (registration) {
//             console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         })
//         .catch(function (err) {
//             console.log('ServiceWorker registration failed: ', err);
//         });
// }

document.addEventListener('DOMContentLoaded', () => {
    const worker = new Worker('./worker.js');
    worker.postMessage('Hello from main to worker');
    worker.onmessage = (e) => {
        console.log(e.data)
    }
})