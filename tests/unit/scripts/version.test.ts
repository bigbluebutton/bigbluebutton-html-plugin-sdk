import { describe, it, expect } from 'vitest';

import {
  nextVersion,
  distTagFor,
  compareVersions,
} from '../../../scripts/lib/version';

describe('nextVersion', () => {
  it('increments the patch number of a stable version', () => {
    expect(nextVersion('0.1.26')).toBe('0.1.27');
    expect(nextVersion('0.0.105')).toBe('0.0.106');
    expect(nextVersion('1.0.0')).toBe('1.0.1');
  });

  it('increments the counter of a pre-release instead of the patch', () => {
    expect(nextVersion('1.0.0-beta.1')).toBe('1.0.0-beta.2');
    expect(nextVersion('1.0.0-rc.2')).toBe('1.0.0-rc.3');
    expect(nextVersion('1.2.0-alpha.9')).toBe('1.2.0-alpha.10');
  });

  it('never returns a version that is lower than or equal to its input', () => {
    const inputs = ['0.1.26', '1.0.0', '1.0.0-beta.1', '1.0.0-rc.2', '1.2.0-alpha.9'];
    inputs.forEach((input) => {
      expect(compareVersions(nextVersion(input), input)).toBe(1);
    });
  });

  it('rejects a pre-release that carries no numeric counter', () => {
    expect(() => nextVersion('1.0.0-beta')).toThrow(/counter/);
  });

  it('rejects input that is not a version', () => {
    ['', '1.0', '1.0.0.0', 'v1.0.0', 'banana', '01.0.0'].forEach((input) => {
      expect(() => nextVersion(input)).toThrow();
    });
  });
});

describe('distTagFor', () => {
  it('resolves a stable version to the latest tag', () => {
    expect(distTagFor('0.1.26')).toBe('latest');
    expect(distTagFor('1.0.0')).toBe('latest');
  });

  it('resolves a pre-release to its own channel', () => {
    expect(distTagFor('1.0.0-beta.2')).toBe('beta');
    expect(distTagFor('1.0.0-rc.3')).toBe('rc');
    expect(distTagFor('1.0.0-alpha.1')).toBe('alpha');
    expect(distTagFor('1.0.0-next.4')).toBe('next');
  });

  it('never resolves a pre-release to the latest tag', () => {
    expect(distTagFor('1.0.0-beta.1')).not.toBe('latest');
  });

  it('rejects a channel name npm would not accept as a dist-tag', () => {
    expect(() => distTagFor('1.0.0-1.2')).toThrow();
  });

  it('rejects input that is not a version', () => {
    ['', '1.0', 'v1.0.0', 'banana'].forEach((input) => {
      expect(() => distTagFor(input)).toThrow();
    });
  });
});

describe('compareVersions', () => {
  it('orders by major, minor and patch', () => {
    expect(compareVersions('1.0.0', '0.9.9')).toBe(1);
    expect(compareVersions('0.1.26', '0.1.27')).toBe(-1);
    expect(compareVersions('0.1.26', '0.1.26')).toBe(0);
    expect(compareVersions('0.0.105', '0.0.99')).toBe(1);
  });

  it('orders a pre-release below the release it precedes', () => {
    expect(compareVersions('1.0.0-beta.1', '1.0.0')).toBe(-1);
    expect(compareVersions('1.0.0', '1.0.0-rc.9')).toBe(1);
  });

  it('orders pre-releases of the same version by their identifiers', () => {
    expect(compareVersions('1.0.0-beta.1', '1.0.0-beta.2')).toBe(-1);
    expect(compareVersions('1.0.0-beta.10', '1.0.0-beta.9')).toBe(1);
    expect(compareVersions('1.0.0-alpha.1', '1.0.0-beta.1')).toBe(-1);
    expect(compareVersions('1.0.0-rc.1', '1.0.0-beta.1')).toBe(1);
  });
});
