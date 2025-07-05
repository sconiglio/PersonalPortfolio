const fs = require("fs");
const path = require("path");

// Read package.json
const packagePath = path.join(__dirname, "..", "package.json");
const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

console.log(`Current version: ${packageJson.version}`);

// Validate version format
const versionRegex = /^\d+\.\d+\.\d+$/;
if (!versionRegex.test(packageJson.version)) {
  console.error("Invalid version format. Expected format: x.y.z");
  process.exit(1);
}

console.log("Version format is valid!");
