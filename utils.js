export function triggerHeavyWorkload(_, res) {
    let total = 0;

    for (let i = 0; i < 50_000_000; i++) {
        total++
    }

    res.send(`Total: ${total}`)
}

export function serverStatus(_, res) {
    res.send('Server is Running')
}