const Signal = require("./Signal");

class Core {
  signalManager;
  
  constructor() {
    this.signalManager = new Signal(undefined, { unsafe: true});
  }
}

module.exports = Core;
