import { Component, ErrorInfo, ReactNode } from 'react';
import pluginLogger from '../utils/logger/logger';
import pluginTelemetry from './telemetry';

/* eslint-disable react/require-default-props -- optional props, read with their fallbacks below */
export interface PluginErrorBoundaryProps {
  children?: ReactNode;
  /** Rendered instead of the children after an error. Defaults to nothing. */
  fallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}
/* eslint-enable react/require-default-props */

interface PluginErrorBoundaryState {
  failed: boolean;
}

/**
 * Wrap what a plugin renders into its own root (panel, floating window, generic content) to report
 * render errors to the client under this plugin's name. Errors from a plugin served from another
 * origin reach the page as "Script error.", so this is the only way to attribute them.
 *
 * @example
 * ```tsx
 * contentFunction: (element) => {
 *   const root = ReactDOM.createRoot(element);
 *   root.render(<PluginErrorBoundary><Panel /></PluginErrorBoundary>);
 *   return root;
 * }
 * ```
 */
export class PluginErrorBoundary extends Component<
  PluginErrorBoundaryProps, PluginErrorBoundaryState
> {
  constructor(props: PluginErrorBoundaryProps) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError(): PluginErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(thrown: unknown, info: ErrorInfo): void {
    // React passes whatever was thrown, null included
    const error = thrown instanceof Error ? thrown : new Error(String(thrown));
    pluginTelemetry.reportError(error);
    pluginLogger.error({
      logCode: 'plugin_render_error',
      extraInfo: { errorName: error.name, errorMessage: error.message },
    }, 'Plugin render error');
    const { onError } = this.props;
    onError?.(error, info);
  }

  render(): ReactNode {
    const { failed } = this.state;
    const { children, fallback } = this.props;
    return failed ? (fallback ?? null) : (children ?? null);
  }
}

export default PluginErrorBoundary;
