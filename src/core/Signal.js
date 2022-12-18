const Global = require("./Global");
const { SUCCESS, ERROR } = require("./typedefs");

const IS_INVALID_TYPE = (value, type) => (typeof value == type) == false;

class Signal {
  #signalTable = new Map();

  /**
   * @typedef {Object} Flags
   * @property {boolean} unsafe Allows you connect to non-existing signal. It will create it when you attempt to do that.
   *
   * @param {[String]} signals list of signals that will be created on object initialization
   * @param {Flags} flags additional properties to configure signal behaviour
   */
  constructor(signals, flags) {
    this.unsafe = flags?.unsafe || false;

    this.#registerSignals(signals || []);
  }

  /**
   * @doc
   * @param {[String]} signals
   */
  addSignals(signals) {
    if (this.IS_SAFE()) return;

    signals.forEach((signal) => {
      this.#signalTable.set(signal, new Map());
    });
  }

  /**
   * @doc Connects an action to a signal
   * @param {String} signal String represents the name of the signal
   * @param {Object} target Object that has the action method written
   * @param {String} action action method that willbe called when you emit the singal
   * @param {Boolean} oneshot disconnect that target after emition
   * @return {number} status code
   */
  connect(signal, target, action, oneshot) {
    if (IS_INVALID_TYPE(signal, "string")) {
      Global.log("Atom#connect: Signal has to be string");
      return ERROR;
    }
    if (IS_INVALID_TYPE(target, "object")) {
      Global.log("Atom#connect: Target has to be object");
      return ERROR;
    }
    if (IS_INVALID_TYPE(action, "string")) {
      Global.log("Atom#connect: Action has to be string");
      return ERROR;
    }

    /** @type {Map} actions*/
    let actions = undefined;
    
    if (this.#signalTable.has(signal) == false) {
      if (this.IS_SAFE()) {
        Global.log(`Atom#connect: Signal [${signal}] could not be found`);
        return ERROR;
      }
      actions = new Map();
      this.#signalTable.set(signal, actions);
    } else actions = this.#signalTable.get(signal);

    /** @type {Set} actions*/
    let targets = undefined;

    if (actions.has(action) == false) {
      targets = new Set();
      actions.set(action, targets);
    } else targets = actions.get(action);

    target.oneshot = oneshot
    targets.add(target);

    return SUCCESS;
  }

  /**
   * @doc Removes an action from a signal
   * @param {String} signal String represents the name of the signal
   * @param {Object} target Object that has the action method written
   * @param {String} action action method that willbe called when you emit the singal
   */
  disconnect(signal, target, action) {
    if (IS_INVALID_TYPE(signal, "string")) {
      Global.log("Atom#disconnect: Signal has to be string");
      return ERROR;
    }
    if (IS_INVALID_TYPE(target, "object")) {
      Global.log("Atom#disconnect: Target has to be object");
      return ERROR;
    }
    if (IS_INVALID_TYPE(action, "string")) {
      Global.log("Atom#disconnect: Action has to be string");
      return ERROR;
    }

    if (this.#signalTable.has(signal) == false) return ERROR;

    const actions = this.#signalTable.get(signal);
    if (actions.has(action) == false) return ERROR;

    /** @type {Set} targets */
    const targets = actions.get(action);

    //Clean up target on disconnect
    if(target.oneshot) 
      delete target.oneshot

    targets.delete(target);

    if (targets.size == 0) 
      actions.delete(action);
  }

  /**
   * @doc Emits the given signal and call all connected actions with any number of arguments
   * @param {String} signal String represents the name of the signal
   * @param  {...any} args Arguments that will be passed to the action
   * @returns
   */
  emit(signal, ...args) {
    if (IS_INVALID_TYPE(signal, "string"))
      return Global.log("Atom#emit: Signal has to be string");

    if (this.#signalTable.has(signal) == false) return;

    /** @type {Map} actions */
    const actions = this.#signalTable.get(signal);

    //Action keys are same as function name
    for (let key of actions.keys()) {
      /** @type {Set} targets*/
      const targets = actions.get(key);

      targets.forEach((target) => {
        const action = target[key];
        action(...args);
        if(target.oneshot) this.disconnect(signal, target, key)
      });
    }
  }

  setSafe = (safe) => (this.unsafe = !safe);

  IS_SAFE = () => this.unsafe == false;
  HAS_SIGNAL = (signal) => this.#signalTable.has(signal);

  /**
   * @param {[String]} signals
   */
  #registerSignals(signals) {
    if (this.IS_SAFE())
      if (signals.length == 0)
        return Global.log(
          "Atom#constructor: you have to pass at least one signal if you are in safe mode"
        );

    signals.forEach((signal) => {
      this.#signalTable.set(signal, new Map());
      Global.log(`Signal [${signal}] registered`);
    });
  }
}

module.exports = Signal;
