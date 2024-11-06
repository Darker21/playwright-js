/**
 * Exports a collection of custom devices combined with Playwright's default devices.
 *
 * This module imports default device configurations from Playwright and merges them with
 * a custom device list, allowing for easy access to both standard and custom device settings
 * for testing purposes. The custom devices can be extended as needed.
 *
 * @module CustomDevices
 * @constant {Object} CustomDevices - A merged object containing default and custom device configurations.
 * @property {Object} devices - The default devices provided by Playwright.
 * @property {Object} GalaxyA52 - A custom device configuration for the Samsung Galaxy A52.
 */
const { devices } = require("@playwright/test");
const GalaxyA52 = require("./samsung-a52");

const __customList = {
  "Galaxy A52": GalaxyA52,
};

module.exports = {
  CustomDevices: {
    ...devices,
    ...__customList,
  },
};
