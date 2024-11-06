const ParameterError = require("../errors/parameter-error")

module.exports = class TestConfigWebServer {
    /**
 * Constructs a TestConfigWebServer instance with specified configuration options.
 *
 * This constructor initializes the web server configuration, ensuring that required parameters
 * are provided and that either a URL or a port is specified, throwing a ParameterError if any
 * validation fails. It sets various properties related to the server's execution environment.
 *
 * @constructor
 * @param {Object} options - Configuration options for the web server.
 * @param {string} options.command - The command to start the web server.
 * @param {string} [options.cwd] - The current working directory for the server process.
 * @param {Object} [options.env] - Environment variables to set for the server process.
 * @param {boolean} [options.ignoreHTTPSErrors=false] - Whether to ignore HTTPS errors.
 * @param {number} [options.port] - The port on which the server should listen.
 * @param {boolean} [options.reuseExistingServer] - Whether to reuse an existing server instance.
 * @param {string} [options.stdout="ignore"] - The output stream for standard output.
 * @param {string} [options.stderr="pipe"] - The output stream for standard error.
 * @param {number} [options.timeout=60000] - The timeout duration in milliseconds.
 * @param {string} [options.url] - The URL for the server to listen on.
 * @throws {ParameterError} Throws an error if the command is missing or if both URL and port are specified or neither is provided.
 */
constructor({
        command,
        cwd,
        env,
        ignoreHTTPSErrors = false,
        port,
        reuseExistingServer,
        stdout = "ignore",
        stderr = "pipe",
        timeout = 60000,
        url
    }) {
        if (!command) {
            throw new ParameterError("TestConfigWebServer.constructor", "Command");
        }
        if ((!url && !port) || (!!url && !!port)) {
            throw new ParameterError("TestConfigWebServer.constructor", `URL or Port must be specified`);
        }

        this.command = command;
        this.cwd = cwd;
        this.env = env;
        this.ignoreHTTPSErrors = ignoreHTTPSErrors;
        this.port = port;
        this.reuseExistingServer = reuseExistingServer;
        this.stdout = stdout;
        this.stderr = stderr;
        this.timeout = timeout;
        this.url = url;
    }

}