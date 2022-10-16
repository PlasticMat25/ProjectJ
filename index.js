const { Http, GetHandler, PostHandler} = require("./src");

class Server extends Http {
  constructor() {
    super({ port: 3000, static: '/public' })
    
    this.addHandler(new Home())
    this.addHandler(new PostHome())
  }
}

class Home extends GetHandler {
  constructor() {
    super('/home')
  }

  handleRequest(req, res) {
    res.sendView('index')
  }
}

class PostHome extends PostHandler {
  constructor() {
    super('/home')
    this.req = undefined
    this.res = undefined
  }

  handleRequest(req, res) {
    this.req = req
    this.res = res
    req.signalManager.connect('data', this, 'onData')
  }

  onData = (data) => {
    console.log(data)
    this.res.sendView('index')
  }
}


new Server().run()