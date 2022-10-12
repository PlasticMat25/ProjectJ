const fs = require('fs')

const globalSingleton = require("../../core/Global")

class Response {
    #res
    #views

    constructor(res, views) {
        this.#res = res
        this.#views = views
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
}

module.exports = Response

