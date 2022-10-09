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
  	timer () {
		seconds++;

		let hrs = Math.floor(seconds / 3600);
		let mins = Math.floor((seconds - (hrs * 3600)) / 60);
		let secs = seconds % 60;

		if (secs < 10) secs = '0' + secs;
		if (mins < 10) mins = "0" + mins;
		if (hrs < 10) hrs = "0" + hrs;
	}

	start () {
		if (interval) {
			return
		}

		interval = setInterval(timer, this.duration);
	}

	stop () {
		clearInterval(interval);
		interval = null;
	}

	reset () {
		stop();
		seconds = 0;
	}


	enter() {
		if(this.autostart) this.start()
	}

	isPaused = () => this.paused
}

module.exports = Timer;
