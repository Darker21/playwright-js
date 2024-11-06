const envConfig  = require("./environment-config");
const { CustomDevices: devices } = require("../models/devices");

const desktopBrowsers = [
  { deviceName: "Desktop Chrome", channel: "chrome" },
  { deviceName: "Desktop Edge", channel: "msedge" },
  { deviceName: "Desktop Firefox" },
  { deviceName: "Desktop Safari" },
];
const mobileBrowsers = [
  "Galaxy S5",
  "Galaxy S5 landscape",
  "Galaxy A52",
  "iPhone 12",
];

/**
 * Creates a project configuration for a specified device.
 *
 * The `createDeviceProject` function constructs a `Project` object that includes the
 * device's name and its associated configuration. It allows for an optional browser
 * channel to be specified, which is included in the project's configuration, enabling
 * tailored browser automation setups.
 *
 * @param {string} id - The identifier for the device project.
 * @param {string} deviceId - The device name used to access the corresponding device configuration.
 * @param {string} [channel] - An optional channel for the browser, which can be used to specify
 *                             the browser type (e.g., 'chrome', 'firefox').
 * @returns {Project} A project configuration object for the specified device, including the name
 *                    and device settings.
 */
function createDeviceProject(id, deviceId, outputDir, channel) {
  return {
    name: id,
    use: { ...devices[deviceId], channel: channel },
    outputDir: outputDir,
  };
}

const desktopProjects = desktopBrowsers.map((d) =>
  createDeviceProject(
    d.deviceName.replace("Desktop ", ""),
    d.deviceName,
    envConfig.DesktopReportPath,
    d.channel
  )
);
const mobileProjects = mobileBrowsers.map((id) =>
  createDeviceProject(id, id, envConfig.MobileReportPath)
);

const projectConfig = [
  {
    name: "Desktop",
    use: desktopBrowsers.map((d) => devices[d.deviceName]),
    outputDir: envConfig.DesktopReportPath,
  },
  {
    name: "Mobile",
    use: mobileBrowsers.map((id) => devices[id]),
    outputDir: envConfig.MobileReportPath,
  },
  ...desktopProjects,
  ...mobileProjects,
];

module.exports = projectConfig;
