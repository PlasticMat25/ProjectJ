const { Http, GetHandler, PostHandler} = require("./src");
const Service = require("./src/lib/http/Service");

class Server extends Http {
  constructor() {
    super({ port: 3000, static: '/public' })
    
    this.serviceManager.addService(new HomeService())

    this.addHandler(new Home())
    this.addHandler(new PostHome())
  }
}

class HomeService extends Service {
  constructor() { super('homeService') }

  sayHello() {
    console.log("Hello from home service")
  }
}

class Home extends GetHandler {
  constructor() {
    super('/home')
    this.inject(['homeService'])
  }

  handleRequest(req, res) {
    res.sendView('index')
    this.homeService.sayHello();
  }
}

class PostHome extends PostHandler {
  constructor() { super('/home') }

  handleRequest(req, res) {
    const { data } = req
    console.log(data)
  }
}

new Server().run()