const Signal = require("./Signal");

class Core {
  signalManager;
  
  constructor() {
    this.signal = new Signal(undefined, { unsafe: true});
  }
}

module.exports = Core;
