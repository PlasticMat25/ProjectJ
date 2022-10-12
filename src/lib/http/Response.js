class Response {
    #res

    constructor(res) {
        this.#res = res
    }

    send(text) {
        this.#res.write(text)
        this.#res.end()
    }

    sendHtml (file) {
        
    }
}

module.exports = Response

