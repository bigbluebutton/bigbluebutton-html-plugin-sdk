/* eslint-disable import/no-extraneous-dependencies */
import { ConsoleMessage } from '@playwright/test';

// The client hands each plugin a logger named `pluginLogger(<plugin name>)`;
// the SDK only falls back to its own `PluginLogger` when there is none.
export const isPluginLog = (msg: ConsoleMessage): boolean => /pluginlogger/i.test(msg.text());
