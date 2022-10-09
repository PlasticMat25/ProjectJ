class GlobalSingleton {
  constructor() {
    this.ENVIRONMENTS = {
      PRODUCTION: 0,
      DEVELOPMENT: 1,
    };

    this.environment;
    this.logger;
  }

  setEnvironment(environment) {
    this.environment = environment;
  }

  log(...args) {
    if (this.environment == this.ENVIRONMENTS.PRODUCTION) return;

    console.log(...args);
  }
}

const gloabalSingleton = new GlobalSingleton();

module.exports = gloabalSingleton;
