/**
 * Version arithmetic shared by the publish scripts.
 *
 * This lives in Node rather than in the shell because parsing a semantic version in bash is
 * exactly what used to break: `cut -d. -f3` on "1.0.0-beta.1" yields "0-beta", and
 * `$(("0-beta" + 1))` silently evaluates to 1, so the release either repeated the version it
 * was already on or walked backwards.
 *
 * The parsing, the increment and the ordering come from the `semver` library. Two rules stay
 * here because they are not semver's to decide: a pre-release carrying no numeric counter is
 * refused instead of being started at ".0", and the npm dist-tag is derived from the
 * pre-release channel.
 *
 * Build metadata ("1.0.0+build.5") is deliberately not supported: npm ignores it when
 * resolving a version, and this repository has never published one. `semver` accepts it and
 * drops it, which is why parseVersion below is stricter than semver.
 *
 * Can be used as a module or from the command line:
 *
 *   node scripts/lib/version.js next 1.0.0-beta.1     # -> 1.0.0-beta.2
 *   node scripts/lib/version.js dist-tag 1.0.0-beta.2 # -> beta
 *   node scripts/lib/version.js compare 1.0.0 0.9.9   # -> 1
 *   node scripts/lib/version.js validate 1.0.0-beta   # -> 1.0.0-beta
 */

const semver = require('semver');

const DIST_TAG_PATTERN = /^[a-zA-Z][a-zA-Z0-9-]*$/;

/**
 * Splits a version into its parts, refusing anything that is not a semantic version.
 *
 * @param {string} version e.g. "0.1.26" or "1.0.0-beta.1"
 * @returns {{major: number, minor: number, patch: number, prerelease: string[]}}
 */
function parseVersion(version) {
  if (typeof version !== 'string') {
    throw new TypeError(`Expected a version string, got ${typeof version}.`);
  }

  const trimmed = version.trim();

  // Comparing against the input rather than trusting a truthy answer: semver normalises what
  // it accepts, so `valid("v1.0.0")` returns "1.0.0" and `valid("1.0.0+build.5")` returns
  // "1.0.0". Only a version that comes back unchanged is one this repository can publish.
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
    // semver types the identifiers it parses, so "1.0.0-beta.1" yields ["beta", 1]. The
    // exported shape is a list of strings.
    prerelease: prerelease.map(String),
  };
}

/**
 * The version that follows the given one.
 *
 * A stable version moves to the next patch (0.1.26 -> 0.1.27). A pre-release moves its own
 * counter instead, staying on the same channel (1.0.0-beta.1 -> 1.0.0-beta.2), because a
 * pre-release exists precisely to be iterated before the release it precedes.
 *
 * @param {string} currentVersion
 * @returns {string}
 */
function nextVersion(currentVersion) {
  const {
    major, minor, patch, prerelease,
  } = parseVersion(currentVersion);
  const version = currentVersion.trim();

  if (prerelease.length === 0) {
    return semver.inc(version, 'patch');
  }

  // Asked to increment "1.0.0-beta", semver answers "1.0.0-beta.0", inventing a counter that
  // was never published. The refusal below has to come first. Reading the identifiers as
  // semver typed them is what tells a channel from a counter: "beta" stays a string, 1 does
  // not.
  const identifiers = semver.prerelease(version);
  const counter = identifiers[identifiers.length - 1];

  if (typeof counter !== 'number') {
    throw new Error(
      `"${currentVersion}" is a pre-release with no numeric counter to increment. Pass the `
      + `version you want explicitly, for example "${major}.${minor}.${patch}-`
      + `${prerelease.join('.')}.1".`,
    );
  }

  return semver.inc(version, 'prerelease');
}

/**
 * The npm dist-tag a version should be published under.
 *
 * A stable version takes "latest". A pre-release takes its own channel ("beta", "rc", ...), so
 * that installing the package without asking for a tag keeps returning the stable release.
 *
 * @param {string} version
 * @returns {string}
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
 * Orders two versions: -1 if the first is lower, 1 if it is higher, 0 if they are equal.
 *
 * Used to refuse a release that would not move the package forward.
 *
 * @param {string} versionA
 * @param {string} versionB
 * @returns {number}
 */
function compareVersions(versionA, versionB) {
  // Validated here rather than left to semver so that an invalid version is reported the same
  // way it is everywhere else in this file.
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
    // Answers "is this a version?", which is a different question from "what follows it?".
    // A pre-release such as 1.0.0-beta is a perfectly valid version to release even though
    // nothing can be derived from it automatically.
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
