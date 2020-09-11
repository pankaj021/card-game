class ApiReturnedError extends Error {
    constructor(message) {
        super(message || "The API returned an error"); 
        this.name = "ApiReturnedError"; 
        Error.captureStackTrace(this, this.constructor);
        this.status = 503;
    }
}

class NoRouteFound extends Error {
    constructor(message) {
        super(message || "No route found."); 
        this.name = "NoRouteFound"; 
        Error.captureStackTrace(this, this.constructor);
        this.status = 404;
    }
}

class NoResourceFound extends Error {
    constructor(message) {
        super(message || "Resource not found."); 
        this.name = "NoResourceFound"; 
        Error.captureStackTrace(this, this.constructor);
        this.status = 404;
    }
}

module.exports = {
    ApiReturnedError,
    NoRouteFound,
    NoResourceFound
}