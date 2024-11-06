const ParameterError = require("./errors/parameter-error");

module.exports.DeviceDescriptor = class DeviceDescriptor {
  /**
   * Constructs a DeviceDescriptor instance with specified device characteristics.
   *
   * This constructor initializes the device descriptor with properties such as viewport size,
   * user agent string, device scale factor, and mobile capabilities. It ensures that a default
   * browser type is provided, throwing a ParameterError if it is missing.
   *
   * @constructor
   * @param {Object} options - Configuration options for the device descriptor.
   * @param {ViewportSize} options.viewport - The viewport dimensions (width and height).
   * @param {string} options.userAgent - The user agent string for the device.
   * @param {number} [options.deviceScaleFactor=1.0] - The device scale factor for rendering.
   * @param {boolean} [options.isMobile=false] - Indicates if the device is a mobile device.
   * @param {boolean} [options.hasTouch=false] - Indicates if the device supports touch events.
   * @param {'chromium' | 'firefox' | 'webkit'} options.defaultBrowserType - The default browser type for the device.
   * @throws {ParameterError} Throws an error if the defaultBrowserType is missing.
   */
  constructor({
    viewport,
    userAgent,
    deviceScaleFactor = 1.0,
    isMobile = false,
    hasTouch = false,
    defaultBrowserType,
  }) {
    if (!defaultBrowserType) {
      throw new ParameterError(
        "DeviceDescriptor.constructor",
        "defaultBrowserType"
      );
    }

    this.viewport = viewport;
    this.userAgent = userAgent;
    this.deviceScaleFactor = deviceScaleFactor;
    this.isMobile = isMobile;
    this.hasTouch = hasTouch;
    this.defaultBrowserType = defaultBrowserType;
  }
};

class ViewPortSize {
  constructor(width, height) {
    if (!width) {
      throw new ParameterError("ViewPortSize.constructor", "width");
    }
    if (!height) {
      throw new ParameterError("ViewPortSize.constructor", "height");
    }

    this.width = width;
    this.height = height;
  }
}

/**
 * @template T
 * @template {string} U
 * @typedef {T | (U & { zz_IGNORE_ME?: never })} LiteralUnion
 */
