const { Atom } = require("../core");

class Timer extends Atom {
  /**
   * @typedef {Object} Configuration
   * @property {boolean} autostart starts automatically this timer when seconds are set
   * @property {boolean} oneshot runs once this timer
   * 
   * @param {Configuration} configuration 
   */
  constructor(options = {}) {
    super();

    this.signalManager.addSignals(['start, stop, pause, unpause, timeout'])

    this.autostart = options.autostart || false
    this.oneshot = options.oneshot || true
    this.duration = options.duration || 1
    this.paused = options.paused || false
    this.delay = options.delay || 1
  }

  enter() {
    if(this.autostart) this.start(this.duration)
  }

  start(duration) {
    
  }

  stop() {

  }

  isPaused = () => this.paused
}

module.exports = Timer;
