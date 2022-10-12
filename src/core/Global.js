class GlobalSingleton {
  constructor() {
    this.ENVIRONMENTS = { PRODUCTION: 0, DEVELOPMENT: 1 };

    this.environment = this.ENVIRONMENTS.DEVELOPMENT;
    this.staticDirectory = process.cwd().concat('/views');
  }

  setEnvironment(environment) {
    this.environment = environment;
  }

  setStatic(path) {
    this.staticDirectory = process.cwd().concat(path)
  }

  log(...args) {
    if (this.environment == this.ENVIRONMENTS.PRODUCTION) return;

    console.log(...args);
  }
}

const gloabalSingleton = new GlobalSingleton();

module.exports = gloabalSingleton;
