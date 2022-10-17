const { Atom } = require("../../core");
const Request = require('./Request')
const Response = require('./Response')

const METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  NOT_FOUND: "notFound",
};

class Handler extends Atom {
  constructor(name, method) {
    super()
    
    this.name = name;
    this.method = method;
  }

  /**
   * 
   * @param {Request} req Response object contains all the methods to make a response
   * @param {Response} res Request object contains all information comes with request
   * 
   * ? In case that some handler has no implemented method prevent crash
   */
  handleRequest(req, res) {}
}

class GetHandler extends Handler {
  constructor(name) {
    super(name, METHODS.GET);
  }
}

class PostHandler extends Handler {
  constructor(name) {
    super(name, METHODS.POST);
  }
}

class PutHandler extends Handler {
  constructor(name) {
    super(name, METHODS.PUT);
  }
}

class DeleteHandler extends Handler {
  constructor(name) {
    super(name, METHODS.DELETE);
  }
}

class NotFoundHandler extends Handler {
  constructor(name) {
    super(name, METHODS.NOT_FOUND);
  }
}

module.exports = {
  GetHandler,
  PostHandler,
  PutHandler,
  DeleteHandler,
  NotFoundHandler,
};
