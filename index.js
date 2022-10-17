<<<<<<< HEAD
const { Http, GetHandler } = require("./src");

class Server extends Http {
  constructor() {
    super({static: '/public'})

    this.signalManager.connect('ready', this, 'onReady', true)

    this.addHandler(new GetHome())
  }

  onReady(port) {
    console.log('Server running on port ' + port)
  }
}

class GetHome extends GetHandler {
=======
const { Http, GetHandler, PostHandler} = require("./src");

class Server extends Http {
  constructor() {
    super({ port: 3000, static: '/public' })
    
    this.addHandler(new Home())
    this.addHandler(new PostHome())
  }
}

class Home extends GetHandler {
>>>>>>> 825e1d199a58a7949bdda60d97e9dafcaab4d38d
  constructor() {
    super('/home')
  }

  handleRequest(req, res) {
<<<<<<< HEAD
    console.log('Data', req.data)
  }
}

=======
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


>>>>>>> 825e1d199a58a7949bdda60d97e9dafcaab4d38d
new Server().run()