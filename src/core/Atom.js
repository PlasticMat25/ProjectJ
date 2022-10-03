const Signal = require("./Signal");

class Atom {
  #signal;

  /**
   * @typedef {Object} SignalConfiguration
   * @property {[String]} signals
   * @property {{unsafe: boolean}} flags
   *
   * @typedef {Object} Configuration
   * @property {SignalConfiguration} signalConfiguration
   *
   * @param {Configuration} configuration
   */
  constructor(configuration) {
    const signalsConfiguration = configuration.signalConfiguration || {};
    this.#signal = new Signal(
			signalsConfiguration.signals, {
      flags: signalsConfiguration.flags,
    });
  }
}

module.exports = Atom;
