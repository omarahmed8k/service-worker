self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    return self.clients.claim();
});

self.addEventListener('message', function (event) {
    console.log('[Service Worker] Message received from main thread', event.data);
    const number = parseInt(event.data);

    // Fetch API
    var myHeaders = new Headers();
    myHeaders.append("apikey", "z464QULXlhaGyLbieGjYDAevafurNF8r");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=egp&from=usd&amount=${number}`, requestOptions)
        .then(response => response.text())
        .then(result => event.source.postMessage(JSON.parse(result).result))
        .catch(error => console.log('error', error));


});