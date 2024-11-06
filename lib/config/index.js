// @ts-check
const envConfig = require("./environment-config");
const { Reporters } = require("./playwright-reporter-config");
const projectConfig = require("./playwright-project-config");
const fileConfig = require("./file-config");

module.exports = {
    EnvironmentConfig: envConfig,
    Reporters: Reporters,
    ProjectConfig: projectConfig,
    FileConfig: fileConfig
}