export default function log(req) {
    const date = new Date()
    const logInfo = `${req.method}\t ${req.ip}\t ${
        req.url
    }\t ${date.toISOString()}`
    console.log(logInfo)
}
