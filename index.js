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
  constructor() {
    super('/home')
  }

  handleRequest(req, res) {
    console.log('Data', req.data)
  }
}

new Server().run()