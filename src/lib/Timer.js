const { Atom } = require("../core");

class Timer extends Atom {
  /**
   * @typedef {Object} Configuration
   * @property {boolean} autostart starts automatically this timer when seconds are set
   * @property {boolean} oneshot runs once this timer
   * 
   * @param {Configuration} configuration 
   */
  constructor(configuration) {
    super({
      signalConfiguration: { signals: ["start", "stop", "paused", "unpaused", "timeout"] },
    });
  }
}

module.exports = Timer;
