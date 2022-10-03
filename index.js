const ProjectJ = require('./src')

const GLOBAL = ProjectJ.Global()
GLOBAL.setEnvironment(GLOBAL.ENVIRONMENTS.DEVELOPMENT)

const timer = new ProjectJ.Timer()


console.log(ProjectJ)