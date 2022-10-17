const { Atom } = require("../core");
const { SEC_TO_MS } = require("../utilities/Convert");

/**
 * ! Untested so it's still considered broken
 */
class Timer extends Atom {
  #timer;

  #startedAt = undefined;
  #remaining = undefined;
  #paused = false

  /**
   * @typedef {Object} Configuration
   * @property {boolean} autostart starts automatically this timer when seconds are set
   * @property {boolean} oneshot runs once this timer
   *
   * @param {Configuration} configuration
   */
  constructor(options = {}) {
    super();

    this.signalManager.addSignals(["start, stop, pause, unpause, timeout"]);
    this.signalManager.setSafe(true)

    this.autostart = options.autostart || false;
    this.oneshot = options.oneshot || true;
    this.duration = options.duration || 1;
    this.delay = options.delay || 1;
  }

  enter() {
    if (this.autostart) this.start(this.duration);
  }

  start(duration) {
    const seconds = duration ? duration : this.duration;

    this.signalManager.emit("start");
    this.#startedAt = new Date();

    this.#createTimer(SEC_TO_MS(seconds))
  }

  stop() {
    if (!this.#timer) return;
    this.#removeTimer()
    this.signalManager.emit("stop");
  }

  pause() {
    this.#paused = true;
    this.#remaining = new Date() - this.#startedAt;
    this.#removeTimer()
    this.signalManager.emit('pause')
  }

  unpause() {
    if(this.#paused == false) return
    this.#paused = false;
    this.#startedAt = new Date();
    this.#createTimer(this.#remaining)
    this.#remaining = undefined
    this.signalManager.emit('unpause')
  }

  isPaused = () => this.#paused;

  #createTimer(duration) {
    this.#timer = setTimeout(() => {
      this.signalManager.emit("timeout");
      this.#startedAt = undefined;

      if(this.oneshot === false) this.start(duration)
    }, duration);
  }

  #removeTimer() {
    clearTimeout(this.#timer);
    this.#timer = undefined;
  }
}

module.exports = Timer;
