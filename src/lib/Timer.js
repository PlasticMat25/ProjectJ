const { Atom } = require("../core");

class Timer extends Atom {
  /**
   * @typedef {Object} Configuration
   * @property {boolean} autostart starts automatically this timer when seconds are set
   * @property {boolean} oneshot runs once this timer
   * 
   * @param {Configuration} configuration 
   */
  constructor(options) {
    super();

    this.signalManager.addSignals(['start, stop, pause, unpause, timeout'])

    this.autostart = options.autostart
    this.oneshot = options.oneshot || true
    this.duration = options.duration || undefined
    this.paused = options.paused || false
    this.delay = options.delay
  }

  enter() {
    if(this.autostart) this.start(this.duration)
  }

  start(time) {
    
  }

  stop() {

  }

  isPaused = () => this.paused
}

module.exports = Timer;
