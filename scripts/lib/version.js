/**
 * Version arithmetic shared by the publish scripts.
 *
 * This lives in Node rather than in the shell because parsing a semantic version in bash is
 * exactly what used to break: `cut -d. -f3` on "1.0.0-beta.1" yields "0-beta", and
 * `$(("0-beta" + 1))` silently evaluates to 1, so the release either repeated the version it
 * was already on or walked backwards.
 *
 * Build metadata ("1.0.0+build.5") is deliberately not supported: npm ignores it when
 * resolving a version, and this repository has never published one.
 *
 * Can be used as a module or from the command line:
 *
 *   node scripts/lib/version.js next 1.0.0-beta.1     # -> 1.0.0-beta.2
 *   node scripts/lib/version.js dist-tag 1.0.0-beta.2 # -> beta
 *   node scripts/lib/version.js compare 1.0.0 0.9.9   # -> 1
 *   node scripts/lib/version.js validate 1.0.0-beta   # -> 1.0.0-beta
 */

const VERSION_PATTERN = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?$/;
const NUMERIC_IDENTIFIER_PATTERN = /^(0|[1-9]\d*)$/;
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

  const match = VERSION_PATTERN.exec(version.trim());

  if (!match) {
    throw new Error(
      `"${version}" is not a semantic version. Expected MAJOR.MINOR.PATCH, optionally followed `
      + 'by a pre-release such as -beta.1.',
    );
  }

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] ? match[4].split('.') : [],
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

  if (prerelease.length === 0) {
    return `${major}.${minor}.${patch + 1}`;
  }

  const counter = prerelease[prerelease.length - 1];

  if (!NUMERIC_IDENTIFIER_PATTERN.test(counter)) {
    throw new Error(
      `"${currentVersion}" is a pre-release with no numeric counter to increment. Pass the `
      + `version you want explicitly, for example "${major}.${minor}.${patch}-`
      + `${prerelease.join('.')}.1".`,
    );
  }

  const bumped = prerelease.slice(0, -1).concat(String(Number(counter) + 1));

  return `${major}.${minor}.${patch}-${bumped.join('.')}`;
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
 * Compares two pre-release identifiers following the semantic versioning precedence rules:
 * numeric identifiers compare numerically, everything else compares as text, and a numeric
 * identifier always ranks below an alphanumeric one.
 */
function comparePrereleaseIdentifiers(identifierA, identifierB) {
  const aIsNumeric = NUMERIC_IDENTIFIER_PATTERN.test(identifierA);
  const bIsNumeric = NUMERIC_IDENTIFIER_PATTERN.test(identifierB);

  if (aIsNumeric && bIsNumeric) {
    return Math.sign(Number(identifierA) - Number(identifierB));
  }

  if (aIsNumeric) {
    return -1;
  }

  if (bIsNumeric) {
    return 1;
  }

  if (identifierA === identifierB) {
    return 0;
  }

  return identifierA < identifierB ? -1 : 1;
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
  const parsedA = parseVersion(versionA);
  const parsedB = parseVersion(versionB);
  const coreParts = ['major', 'minor', 'patch'];

  for (let i = 0; i < coreParts.length; i += 1) {
    const difference = Math.sign(parsedA[coreParts[i]] - parsedB[coreParts[i]]);

    if (difference !== 0) {
      return difference;
    }
  }

  // A version carrying a pre-release ranks below the same version without one.
  if (parsedA.prerelease.length === 0 || parsedB.prerelease.length === 0) {
    return Math.sign(parsedB.prerelease.length - parsedA.prerelease.length);
  }

  const identifierCount = Math.max(parsedA.prerelease.length, parsedB.prerelease.length);

  for (let i = 0; i < identifierCount; i += 1) {
    // The version that runs out of identifiers first is the lower one.
    if (parsedA.prerelease[i] === undefined) {
      return -1;
    }

    if (parsedB.prerelease[i] === undefined) {
      return 1;
    }

    const difference = comparePrereleaseIdentifiers(
      parsedA.prerelease[i],
      parsedB.prerelease[i],
    );

    if (difference !== 0) {
      return difference;
    }
  }

  return 0;
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
