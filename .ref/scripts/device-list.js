const { CustomDevices } = require("../../lib/models/devices");
const fs = require("fs");
const path = require("path");

console.log("Beggining device-list export");

const deviceNames = Object.getOwnPropertyNames(CustomDevices).sort();
const outPath = path.join(__dirname, "../device-list.txt");

/** @type {string[]} */
let lines = [];
lines.push(
  "/* ALL DEVICES ARE PULLED FROM THE DEVICE TYPE IN THE PLAYWRIGHT LIBRARY */",
  "/* REGENERATE LIST USING `npm run ref:generate` */\n",
  ...deviceNames
);

const content = lines.join("\n");

fs.writeFile(outPath, content, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Device list generated successfully!");
  }
});
