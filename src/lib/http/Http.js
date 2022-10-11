const { Atom } = require("../../core")
const http = require('http')

class Http extends Atom {
    #methods = {
        get: new Map(),
        post: new Map(),
        put: new Map(),
        delete: new Map(),
    }

    #notFound = undefined

    constructor(options = {}) {
        super()
        this.signalManager.addSignals(['request_completed'])
        this.signalManager.setSafe(true)

        this.port = options.port
        this.server = http.createServer(this.#requestListener)
    }
    
    run = () => this.server.listen(this.port)

    addEndpoint = (endpoint) => {
        const { method, name } = endpoint

        const _method = this.#methods[method]

        if(!_method && method == 'notFound') return this.#notFound = endpoint

        _method.set(name, endpoint)
    }

    #requestListener = (req, res) => {
        const { method, url } = req

        req.on('data', (data) => console.log(data))

        const _method = this.#methods[method.toLowerCase()]
        
        let handler = undefined 
        
        handler = _method?.get(url)

        if(handler) return handler.handleRequest(req, res)
        
        if(this.#notFound) return this.#notFound.handleRequest()
        
        return this.#UnhandledEndpoint(res, url)
    }

    #UnhandledEndpoint (res, url) {
        res.write(`Cannot get url -> ${url}`)
        res.end()
    }
}

module.exports = Http