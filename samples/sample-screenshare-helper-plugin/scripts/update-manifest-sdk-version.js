const fs = require('fs');
const path = require('path');

// Resolve paths relative to the project root (not the `scripts` folder)
const projectRoot = path.resolve(__dirname, '..'); // go up one level
const packageJsonPath = path.join(projectRoot, 'package.json');
const manifestPath = path.join(projectRoot, 'manifest.json');

// Read and parse package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const sdkVersion = packageJson.dependencies['bigbluebutton-html-plugin-sdk'] ||
                   packageJson.devDependencies['bigbluebutton-html-plugin-sdk'];

if (!sdkVersion) {
  console.error('bigbluebutton-html-plugin-sdk not found in dependencies');
  process.exit(1);
}

// Clean version string
const cleanedVersion = sdkVersion.replace(/^[\^~]/, '');

// Read and update manifest.json
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
manifest.requiredSdkVersion = cleanedVersion;

// Write it back
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) +'\n', 'utf8');
console.log(`Updated requiredSdkVersion in manifest.json to ${cleanedVersion}`);
