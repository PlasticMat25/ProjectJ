const { Atom } = require("../../core")
const http = require('http')
const Response = require("./Response")
const Request = require("./Request")
const fs = require("fs")

const mime = {
    html: 'text/html',
    jpg: 'image/jpg',
    css: 'text/css'
}

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
        this.views = process.cwd().concat(options.views || '/views')
        this.static = options.static || '/static'

        this.server = http.createServer(this.#requestListener)

        this.#loadStaticFiles()
    }
    
    run = () => {
        this.server.listen(this.port)
        this.signalManager.emit('ready', this.port)
    }

    addHandler = (handler) => {
        const { method, name } = handler

        const _method = this.#methods[method]

        if(!_method && method == 'notFound') {
            this.#notFound = handler
            return 
        }

        _method?.set(name, handler)
    }

    #loadStaticFiles() {
        if(!this.static) return
        
        const directory = process.cwd().concat(this.static)
        const filenames = fs.readdirSync(directory)

        filenames.forEach(filename => {
            const filenameSplited = filename.split('.')
            const extention = filenameSplited[filenameSplited.length - 1]
            if(Object.keys(mime).includes(extention) === false) return

            const contentType = mime[extention]
            const name = this.static.concat('/', filename)
            this.addHandler({
                method: 'get',
                name: name,
                handleRequest: (req, res) => res.sendFile(filename, contentType)
            })        
        })

    }

    #requestListener = (req, res) => {
        const { method, url } = req

        const _method = this.#methods[method.toLowerCase()]
        
        let handler = undefined 
        handler = _method?.get(url)

        const directories = {views: this.views, static: this.static}
        if(handler) return handler.handleRequest(new Request(req), new Response(res, directories))
        
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