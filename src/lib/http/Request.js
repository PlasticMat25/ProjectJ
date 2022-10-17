class Request {
    #req
    data = new Map()
    
    constructor(req) {
        this.#req = req
    }
    
    async init() { return this.#loadData() }

    #loadData() {
        return new Promise((resolve, reject) => {
            const dataArray = new Array()
            this.#req.on('data', chunk => dataArray.push(chunk))
            this.#req.on('end', () => resolve(this.#onData(dataArray)))
        })
    }

    #onData = (dataArray) => {
        if(dataArray.length == 0) return
        
        let data  = dataArray.join('')
        data = data.split('&')

        data.forEach(element => {
            const [key, value] = element.split('=')
            this.data.set(key, value)
        });
    }
}

module.exports = Request