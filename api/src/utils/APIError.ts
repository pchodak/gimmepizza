import * as httpStatus from 'http-status';

class ExtendableError extends Error {
  // public errors?: any;
  // public status?: any;
  // public isPublic?: any;
  // public isOperational?: any;
  constructor({
    message, errors, status, isPublic, stack,
  }) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
    // Error.captureStackTrace(this, this.constructor.name);
  }
}

class APIError extends ExtendableError {
  constructor({
    message,
    errors,
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }) {
    super({
      message, errors, status, isPublic, stack,
    });
  }
}

export default APIError
