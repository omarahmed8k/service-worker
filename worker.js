onmessage = (e) => {
    console.log(e.data)
    postMessage('Hello from worker top main')
}
