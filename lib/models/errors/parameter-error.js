/**
 * Represents an error related to missing parameters in method calls.
 *
 * This class extends the built-in Error class to provide a specific error type
 * that captures the method name and the missing parameter name, facilitating
 * improved debugging and error handling in JavaScript applications.
 *
 * @module ParameterError
 * @class
 * @extends Error
 * @param {string} methodName - The name of the method where the parameter is missing.
 * @param {string} paramName - The name of the missing parameter.
 */
module.exports = class ParameterError extends Error {

    constructor(methodName, paramName) {
        const message = `Parameter "${paramName}" is missing when calling ${methodName}`;
        super(message);
        this.methodName = methodName;
        this.parameterName = paramName;
    }
}
