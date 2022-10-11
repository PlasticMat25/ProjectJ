const { Atom, Global } = require("../../core")
const http = require('http')

class Http extends Atom {
    #endpoints = {
        get: new Map(),
        post: new Map(),
        put: new Map(),
        delete: new Map()
    }

    constructor(options = {}) {
        super()
        this.signalManager.addSignals(['request_completed'])
        this.signalManager.setSafe(true)

        this.port = options.port
        this.server = http.createServer(this.#requestListener)
    }
    
    run() {
        this.server.listen(this.port)
    }

    addEndpoint = (endpoint) => {
        const { method, url, handler } = endpoint
        const endpoint = this.#endpoints[method]
        endpoint.set(url, handler)
    }

    #requestListener = (req, res) => {
        const { method, url } = req

        req.on('data', (data) => console.log(data))

        const endpoint = this.#endpoints[method]
        const handler = endpoint?.get(url)

        if(!handler) return notFoundResponse
        
        //handler.handleRequest()

        // console.log('Request', req, '\nResponse', res)

        res.write('Shit')
        res.end()
    }
}

module.exports = Http