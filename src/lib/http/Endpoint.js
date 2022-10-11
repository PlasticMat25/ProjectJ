const { Atom } = require("../../core");

const METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  NOT_FOUND: "notFound",
};

class Endpoint extends Atom {
  constructor(name, method) {
    super()
    
    this.name = name;
    this.method = method;
  }

  // ? In case that some handler has no implemented method prevent crash
}

class GetHandler extends Endpoint {
  constructor(name) {
    super(name, METHODS.GET);
  }

  handleRequest = (req, res) => {}

}

class PostHandler extends Endpoint {
  constructor(name) {
    super(name, METHODS.POST);
  }
}

class PutHandler extends Endpoint {
  constructor(name) {
    super(name, METHODS.PUT);
  }
}

class DeleteHandler extends Endpoint {
  constructor(name) {
    super(name, METHODS.DELETE);
  }
}

class NotFoundHandler extends Endpoint {
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
