const { Global } = require('../../core')
const { ERROR } = require('../../core/typedefs')
const { IS_INVALID_INSTANCE } = require('../../utilities/TypeChecker')
const Service = require('./Service')

class ServiceManager {
    #services = new Map()
  
    addService(service) {
        if(IS_INVALID_INSTANCE(service, Service)) {
            Global.log("Atom#addService: Service has to be instance of service");
            return ERROR;
        }
        
        const { name } = service
        
        if(!name) {
            Global.log("Atom#addService: Service name must be defined");
            return ERROR;
        }

        this.#services.set(name, service)
    }

    getService(serviceName) {
        return this.#services.get(serviceName)
    }
}

module.exports = ServiceManager