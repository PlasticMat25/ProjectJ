const { Atom } = require("../../core")
const {}
const http = require('http')
const Response = require("./Response")
const Request = require("./Request")

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
        this.signalManager.addSignals(['ready', 'request_completed', 'error'])
        this.signalManager.setSafe(true)

        this.port = options.port || 5000
        this.server = http.createServer(this.#requestListener)
    }
    
    run = () => {
        this.server.listen(this.port)
        this.signalManager.emit('ready', this.port)
    }

    addEndpoint = (endpoint) => {
        const { method, name } = endpoint

        const _method = this.#methods[method]

        if(!_method && method == 'notFound') return this.#notFound = endpoint

        _method.set(name, endpoint)
    }

    #requestListener = (req, res) => {
        const { method, url } = req

        const _method = this.#methods[method.toLowerCase()]
        
        let handler = undefined 
        handler = _method?.get(url)

        if(handler) return handler.handleRequest(new Request(req), new Response(res))
        
        if(this.#notFound) 
            return this.#notFound.handleRequest()
        return this.#UnhandledEndpoint(res, url)
    }

    #UnhandledEndpoint (res, url) {
        res.write(`Cannot get url -> ${url}`)
        res.end()
    }
}

module.exports = Http