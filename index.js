const ProjectJ = require('./src');

const Global = ProjectJ.Global;
Global.setEnvironment(Global.ENVIRONMENTS.DEVELOPMENT);

const atom = new ProjectJ.Atom('atom 1')
const atom2 = new ProjectJ.Atom('atom 2')

atom.addAtom(atom2)

atom2.destroy(3)

const object = {
    on_timeout: () => {
        console.log('timeout')
    }
}

const timer = new ProjectJ.Timer()
timer.signalManager.connect('timeout', object, 'on_timeout')
Global.log(ProjectJ)