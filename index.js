const ProjectJ = require("./src");

const Global = ProjectJ.Global;
Global.setEnvironment(Global.ENVIRONMENTS.DEVELOPMENT);

class Home extends ProjectJ.GetHandler {
  constructor() {
    super("/home");
  }

  handleRequest = (req, res) => {
    res.write(`${this.name} hit!`);
    res.end();
  };
}

class Server extends ProjectJ.Http {
  constructor() {
    super({port: 3000})

    this.addEndpoint(new Home())

    this.signalManager.connect('ready', this, 'onReady')
  }

  onReady(port) {
    console.log('Server is running on port ' + port)
  }
}

new Server().run()

Global.log(ProjectJ);
