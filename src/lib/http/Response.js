const fs = require('fs')

const globalSingleton = require("../../core/Global")

class Response{
    #res
    #views
    #static

    constructor(res, directories) {
        this.#res = res
        this.#views = directories.views
        this.#static = directories.static
    }

    send(text) {
        this.#res.write(text)
        this.#res.end()
    }

    sendView (file) { 
        fs.readFile(this.#views.concat('/', file, '.html'), (error, data) => {
            if(error) {
                console.error(error)
                return
            }

            this.#res.write(data.toString())
            this.#res.end()
        })
    }

    sendFile(filename, contentType) {
        fs.readFile(process.cwd().concat(this.#static, '/', filename), (error, data)=> {
            if(error) {
                console.log(error)
                return this.#internalServerError()
            }

            this.#res.writeHead(200, {'Content-Type': contentType})
            this.#res.write(data)
            this.#res.end()
        })
    }

    #internalServerError() {
        this.#res.writeHead(500)
        this.#res.write('Unknown internal server error. We are working hard to solve that issue')
        this.#res.end()
    }
}

module.exports = Response

