// Service Worker registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(function (registration) {
            console.log('[Service Worker] registration successful with scope: ', registration.scope);
        })
        .catch(function (err) {
            console.log('[Service Worker] registration failed: ', err);
        });
}

// Web Worker registration
document.addEventListener('DOMContentLoaded', () => {
    const worker = new Worker('./worker.js');
    worker.postMessage('Hello from main to worker');
    worker.onmessage = (e) => {
        console.log(e.data)
    }
})