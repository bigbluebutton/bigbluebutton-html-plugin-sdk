/**
 * Version arithmetic shared by the publish scripts.
 *
 * It lives in Node because parsing a version in bash is what used to break: `cut -d. -f3` on
 * "1.0.0-beta.1" yields "0-beta", and `$(("0-beta" + 1))` silently evaluates to 1.
 *
 * The parsing, the increment and the ordering come from `semver`. What stays here is what is
 * not semver's to decide: a pre-release with no numeric counter is refused rather than started
 * at ".0", the npm dist-tag is derived from the pre-release channel, and a version semver only
 * accepts by normalising it ("v1.0.0", "1.0.0+build.5") is refused.
 *
 * Usable as a module or from the command line:
 *
 *   node scripts/lib/version.js next 1.0.0-beta.1     # -> 1.0.0-beta.2
 *   node scripts/lib/version.js dist-tag 1.0.0-beta.2 # -> beta
 *   node scripts/lib/version.js compare 1.0.0 0.9.9   # -> 1
 *   node scripts/lib/version.js validate 1.0.0-beta   # -> 1.0.0-beta
 */

const semver = require('semver');

const DIST_TAG_PATTERN = /^[a-zA-Z][a-zA-Z0-9-]*$/;

/**
 * Splits a version such as "1.0.0-beta.1" into its parts, refusing anything that is not a
 * semantic version.
 */
function parseVersion(version) {
  if (typeof version !== 'string') {
    throw new TypeError(`Expected a version string, got ${typeof version}.`);
  }

  const trimmed = version.trim();

  // Compared against the input rather than trusted for being truthy: semver normalises what it
  // accepts, so only a version that comes back unchanged is one this repository can publish.
  if (semver.valid(trimmed) !== trimmed) {
    throw new Error(
      `"${version}" is not a semantic version. Expected MAJOR.MINOR.PATCH, optionally followed `
      + 'by a pre-release such as -beta.1.',
    );
  }

  const {
    major, minor, patch, prerelease,
  } = semver.parse(trimmed);

  return {
    major,
    minor,
    patch,
    // semver types what it parses, so "1.0.0-beta.1" yields ["beta", 1]; this shape is strings.
    prerelease: prerelease.map(String),
  };
}

/**
 * The version that follows the given one. A stable version moves to the next patch
 * (0.1.26 -> 0.1.27); a pre-release moves its own counter and stays on its channel
 * (1.0.0-beta.1 -> 1.0.0-beta.2), because a pre-release exists to be iterated before the
 * release it precedes.
 */
function nextVersion(currentVersion) {
  const version = currentVersion.trim();

  // Called for the refusal, not for the parts: semver.prerelease below answers null both for a
  // stable version and for something that is not a version at all.
  parseVersion(version);

  const identifiers = semver.prerelease(version);

  if (!identifiers) {
    return semver.inc(version, 'patch');
  }

  // Asked to increment "1.0.0-beta", semver answers "1.0.0-beta.0", inventing a counter that
  // was never published, so the refusal has to come first. Reading the identifiers as semver
  // typed them is what tells a channel from a counter: "beta" stays a string, 1 does not.
  if (typeof identifiers[identifiers.length - 1] !== 'number') {
    throw new Error(
      `"${currentVersion}" is a pre-release with no numeric counter to increment. Pass the `
      + `version you want explicitly, for example "${version}.1".`,
    );
  }

  return semver.inc(version, 'prerelease');
}

/**
 * The npm dist-tag a version should be published under: "latest" for a stable version, its own
 * channel ("beta", "rc", ...) for a pre-release, so that installing the package without asking
 * for a tag keeps returning the stable release.
 */
function distTagFor(version) {
  const { prerelease } = parseVersion(version);

  if (prerelease.length === 0) {
    return 'latest';
  }

  const channel = prerelease[0];

  if (!DIST_TAG_PATTERN.test(channel)) {
    throw new Error(
      `"${version}" opens its pre-release with "${channel}", which npm will not accept as a `
      + 'dist-tag. A dist-tag has to start with a letter.',
    );
  }

  return channel;
}

/**
 * Orders two versions: -1 if the first is lower, 1 if it is higher, 0 if they are equal. Used
 * to refuse a release that would not move the package forward.
 */
function compareVersions(versionA, versionB) {
  // semver.compare accepts versions this repository does not, such as "v1.0.0".
  parseVersion(versionA);
  parseVersion(versionB);

  return semver.compare(versionA.trim(), versionB.trim());
}

module.exports = {
  parseVersion,
  nextVersion,
  distTagFor,
  compareVersions,
};

/**
 * Command line entry point, so the shell scripts get a clean message and a non-zero exit code
 * instead of a stack trace when a version is rejected.
 */
function runCommandLine(argv) {
  const [command, ...operands] = argv;

  const commands = {
    next: { arity: 1, run: ([version]) => nextVersion(version) },
    'dist-tag': { arity: 1, run: ([version]) => distTagFor(version) },
    compare: { arity: 2, run: ([versionA, versionB]) => compareVersions(versionA, versionB) },
    // "Is this a version?", a different question from "what follows it?": 1.0.0-beta is valid
    // to release even though nothing can be derived from it automatically.
    validate: { arity: 1, run: ([version]) => { parseVersion(version); return version; } },
  };

  const selected = commands[command];

  if (!selected || operands.length !== selected.arity) {
    process.stderr.write(
      'Usage: node scripts/lib/version.js next <VERSION>\n'
      + '       node scripts/lib/version.js dist-tag <VERSION>\n'
      + '       node scripts/lib/version.js compare <VERSION_A> <VERSION_B>\n'
      + '       node scripts/lib/version.js validate <VERSION>\n',
    );
    process.exit(1);
  }

  try {
    process.stdout.write(`${selected.run(operands)}\n`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCommandLine(process.argv.slice(2));
}
