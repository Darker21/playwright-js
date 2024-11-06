/**
 * Reads and parses a JSON object from a specified file path into a class instance.
 *
 * This function asynchronously reads a JSON file, parses its content, and constructs an instance
 * of the specified class using the parsed data. It handles errors related to file reading and
 * returns `undefined` if the file is empty or not found. The generic type parameter allows for
 * type safety when creating class instances from the JSON data.
 *
 * @param {PathLike | string} path - The path to the file containing the JSON object.
 * @param {Function} classContent - The class constructor to create an instance from the parsed JSON.
 * @returns {object | undefined} The instance of the specified class created from the parsed object,
 * or undefined if the file is empty or not found.
 * @throws {ConfigError} Throws a ConfigError if the file cannot be read.
 */
const { readFile, PathLike, existsSync } = require("fs");
const ConfigError = require("../models/errors/config-error");
const path = require("path");
const TestConfigWebServer = require("../models/file-config/test-config-web-server");

const basePath = path.join(__dirname, "../../env/config");

const WebServerConfigPath = path.join(basePath, "web-server.json");

/**
 * Reads a JSON object from a specified file path and parses it into the specified type.
 *
 * The `readObject` function takes a file path as input, reads the file asynchronously,
 * and attempts to parse its content as JSON. If the file cannot be read, it throws a
 * `ConfigError`. If the file is empty or not found, it returns `undefined`. The generic
 * type parameter `T` allows the caller to specify the expected type of the parsed object.
 *
 * @param {PathLike | string} path - The path to the file containing the JSON object.
 * @param {any} classContext - The class to create from JSON
 * @returns {object | undefined} The parsed object of type T, or undefined if the file is empty
 * or not found.
 * @throws {ConfigError} Throws a ConfigError if the file cannot be read.
 */
function readObject(path, classContext) {
  if (!existsSync(path)) {
    console.warn(`Missing config file at "${path}". Stub with empty json object if not being used.`);
    return undefined;
  }

  readFile(path, "utf-8", (err, data) => {
    if (err) {
      throw new ConfigError(path);
    }

    const content = data;

    if (!content) {
      return undefined;
    }

    const obj = JSON.parse(content);
    if (Array.isArray(obj)) {
      return obj.map((o) => new classContext(o));
    }

    if (Object.getOwnPropertyNames(obj).length < 1) {
      return undefined;
    }

    return new classContext(obj);
  });
}

module.exports = {
  PlayWrightServerConfig: readObject(WebServerConfigPath, TestConfigWebServer),
};
