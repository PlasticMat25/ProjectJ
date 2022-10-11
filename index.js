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

const server = new ProjectJ.Http({ port: 4000 });
server.addEndpoint(new Home());
server.run();

Global.log(ProjectJ);
