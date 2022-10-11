const ProjectJ = require('./src');

const Global = ProjectJ.Global;
Global.setEnvironment(Global.ENVIRONMENTS.DEVELOPMENT);

const atom = new ProjectJ.Atom('atom 1')
const atom2 = new ProjectJ.Atom('atom 2')

atom.addAtom(atom2)

atom2.destroy(3)


new ProjectJ.Http({port: 4000}).run()


Global.log(ProjectJ)