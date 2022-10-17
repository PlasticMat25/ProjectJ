const Core = require("./Core");

class Atom extends Core {
  #atoms = new Map();

  constructor(name) {
    super();

    this.parent = undefined;
    this.name = name;
  }

  enter() {}

  addAtom(atom) {
    if (!atom) return;

    atom.parent = this;
    this.#atoms.set(atom.name, atom);
    console.log("Added item");
    atom.enter();
  }

  getAllAtomsOfType(type) {
    const atoms = Array.from(this.#atoms.values())
    return atoms.filter((atom) => atom instanceof type);
  }

  removeAtomByObject(atom) {
    if (!atom) return;
    this.#atoms.delete(atom.name);
  }

  removeAtomByName(atom) {
    if (!atom) return;
    this.#atoms.delete(atom);
  }

  destroy(delay) {
    if (!this.parent) return;
    console.log("Destroyed item");
    setTimeout(() => this.parent.removeAtomByObject(this), delay * 1000);
  }
}

module.exports = Atom;
