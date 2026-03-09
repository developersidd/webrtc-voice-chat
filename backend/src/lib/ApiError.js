class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong!",
    errors = [],
    stack = "",
  ) {
    super(message);
    this.data = null;
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    /* 
    Notice:
    1. Without passing `err.stack` to the ApiError Class — you only see the re-wrap location:
    ```
    ApiError: Database failed
      at userController (controller.js:10)  ← not helpful
    ```
    2. With passing `err.stack` — you see where it actually broke:
    ```
    Error: Connection timeout
      at db.findUser (database.js:42)       ← actual source
      at userController (controller.js:8)
    ```
    */
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
