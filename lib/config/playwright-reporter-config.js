/**
 * Configures the reporters used by Playwright for test output.
 *
 * This module defines an array of reporter configurations, including built-in reporters
 * such as "html" and "line". The configurations specify how test results should be reported,
 * allowing for customization of the output format and behavior.
 *
 * @module ReportersConfig
 * @constant {Array} reporters - An array of reporter configurations for Playwright.
 * @type {Array<LiteralUnion<'list' | 'dot' | 'line' | 'github' | 'json' | 'junit' | 'null' | 'html', string> | ReporterDescription>} reporters - Each entry can be a reporter type string
 * or a tuple containing a reporter type and its options.
 * @property {string} reporters[].0 - The type of the reporter (e.g., "html", "line").
 * @property {Object} reporters[].1 - An options object for configuring the reporter.
 * @property {string} reporters[].1.open - Specifies when to open the HTML report (e.g., "never").
 */
const { ReporterDescription } = require("@playwright/test");
const _ = require("../models");

/** @type {LiteralUnion<'list' | 'dot' | 'line' | 'github' | 'json' | 'junit' | 'null' | 'html', string> | ReporterDescription[]} */
const reporters = [
  [
    "html",
    {
      open: "never",
    },
  ],
  ["line"],
];

module.exports = { Reporters: reporters }
