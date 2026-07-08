import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// React Testing Library does not auto-clean with Vitest's default config,
// so unmount any rendered tree between tests to avoid cross-test leakage.
afterEach(() => {
  cleanup();
});
