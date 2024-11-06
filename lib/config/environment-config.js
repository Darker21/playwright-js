const ConfigError = require("../models/errors/config-error");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, '../../env/.env') });

/**
 * Retrieves the value of a specified environment variable with a default fallback.
 *
 * This function checks the environment for a variable corresponding to the provided key. 
 * If the variable is not found and no default value is provided, it throws a `ConfigError`. 
 * Otherwise, it returns the value of the environment variable or the specified default value.
 *
 * @param {string} configKey - The key of the environment variable to retrieve.
 * @param {string} [defaultValue=""] - An optional default value to return if the environment variable is not set.
 * @returns {string} The value of the specified environment variable or the default value if not found.
 * @throws {ConfigError} Throws a ConfigError if the environment variable is not set and no default value is provided.
 */
function getString(configKey, defaultValue) {
    const value = getEnvVariable(configKey);

    if (!value && !defaultValue) {
        throw new ConfigError(configKey);
    }

    return value || (defaultValue || "");
}

/**
 * Retrieves a boolean value from an environment variable with a default fallback.
 *
 * The `getBool` function checks the specified environment variable key and converts its 
 * value to a boolean. If the variable is not set, it returns the provided default value. 
 * The function recognizes the string values 'true' and 'false' (case-insensitive) and 
 * throws a `ConfigError` if the value is neither.
 *
 * @param {string} configKey - The key of the environment variable to retrieve.
 * @param {boolean} [defaultValue=false] - The default boolean value to return if the 
 * environment variable is not set or is falsy.
 * @returns {boolean} The boolean representation of the environment variable value, or 
 * the default value if the variable is not set.
 * @throws {ConfigError} Throws a ConfigError if the environment variable value is not 
 * 'true' or 'false'.
 */
function getBool(configKey, defaultValue = false) {
    const value = getEnvVariable(configKey);

    if (!value) {
        return defaultValue;
    }

    const lowerValue = value.toLowerCase();
    if (lowerValue === "true") {
        return true;
    } else if (lowerValue === "false") {
        return false;
    }
    else {
        throw new ConfigError(configKey);
    }
}



/**
 * Retrieves the value of a specified environment variable.
 *
 * The `getEnvVariable` function takes a configuration key as an argument and returns 
 * the corresponding value from the environment variables. If the specified key does not 
 * exist, it will return `undefined`, allowing for easy checks of environment variable 
 * availability in the application.
 *
 * @param {string} configKey - The key of the environment variable to retrieve.
 * @returns {string | undefined} The value of the specified environment variable, or `undefined` 
 * if the variable is not set.
 */
function getEnvVariable(configKey) {
    return process.env[configKey];
}

module.exports = {
    BasePath: getString("BASE_URL"),
    DesktopReportPath: getString("DESKTOP_REPORT_PATH", "html-report/desktop"),
    MobileReportPath: getString("MOBILE_REPORT_PATH", "html-report/mobile"),
    RunParallel: getBool("RUN_PARALLEL")
};
