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

class ChooseADifferentOption extends Error {
    constructor(message) {
        super(message || "Please choose a different option."); 
        this.name = "ChooseADifferentOption"; 
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

class GameOver extends Error {
    constructor(message) {
        super(message || "Game is over."); 
        this.name = "GameOver"; 
        Error.captureStackTrace(this, this.constructor);
        this.status = 404;
    }
}

class ResourceAlreadyExists extends Error {
    constructor(message) {
        super(message || "Resource already exists."); 
        this.name = "ResourceAlreadyExists"; 
        Error.captureStackTrace(this, this.constructor);
        this.status = 404;
    }
}

module.exports = {
    ApiReturnedError,
    NoRouteFound,
    NoResourceFound,
    ChooseADifferentOption,
    GameOver,
    ResourceAlreadyExists
}