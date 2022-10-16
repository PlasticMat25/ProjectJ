const { Atom } = require("../../core")

class Request extends Atom{
    #req
    #data
    
    constructor(req) {
        super()

        this.signalManager.addSignals(['data'])

        this.#req = req

        this.#loadData()
    }

    #loadData() {
        this.#data = ''
        this.#req.on('data', chunk => this.#data += chunk)
        this.#req.on('end', this.#onData)
    }

    #onData = () => {
        const data = this.#data.split('&')

        const body = new Map()

        data.forEach(element => {
            const [key, value] = element.split('=')
            body.set(key, value)
        });

        this.signalManager.emit('data', body)
    }
}

module.exports = Request