const Timer = require('./Timer')
const Http = require('./http/Http')
const Endpoint = require('./http/Endpoint')

module.exports = {
    Timer,
    Http,
    ...Endpoint
}