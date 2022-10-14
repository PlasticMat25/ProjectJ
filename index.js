const { Http, GetHandler} = require("./src");

class Server extends Http {
  constructor() {
    super({ port: 3000, static: '/public' })

    this.addHandler(new Home())
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

new Server().run()