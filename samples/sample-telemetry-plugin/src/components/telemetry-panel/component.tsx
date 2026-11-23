import * as React from 'react';
import { useState } from 'react';
import { pluginTelemetry } from 'bigbluebutton-html-plugin-sdk';

const SLOW_WORK_MS = 300;
const BUSY_WORK_MS = 80;

const sleep = (ms: number) => new Promise((resolve) => { setTimeout(resolve, ms); });

const busyWait = (ms: number) => {
  const end = performance.now() + ms;
  while (performance.now() < end) {
    // Blocks the main thread on purpose
  }
};

function Exploding(): React.ReactElement {
  throw new Error('Sample render error');
}

function TelemetryPanel(): React.ReactElement {
  const [lastResult, setLastResult] = useState('');
  const [exploded, setExploded] = useState(false);

  const runSlowWork = async () => {
    // Marks go to the client's repro trail: name the action, never its content
    pluginTelemetry.mark('slow_work');
    await pluginTelemetry.measure('slow_work', () => sleep(SLOW_WORK_MS));
    setLastResult('slow_work done');
  };

  const runBusyWork = () => {
    pluginTelemetry.mark('busy_work');
    const span = pluginTelemetry.start('busy_work');
    busyWait(BUSY_WORK_MS);
    const duration = span.end();
    setLastResult(`busy_work ${Math.round(duration)} ms`);
  };

  return (
    <div style={{ padding: '1rem', background: 'white', height: '100%' }}>
      <h2>Telemetry sample</h2>
      <p data-test="sampleTelemetryEnabled">
        {`Client telemetry is ${pluginTelemetry.isEnabled() ? 'on' : 'off'}`}
      </p>
      <button type="button" data-test="sampleTelemetrySlowWork" onClick={runSlowWork}>
        {`Measure slow work (${SLOW_WORK_MS} ms)`}
      </button>
      <button type="button" data-test="sampleTelemetryBusyWork" onClick={runBusyWork}>
        {`Block the main thread (${BUSY_WORK_MS} ms)`}
      </button>
      <button type="button" data-test="sampleTelemetryThrow" onClick={() => setExploded(true)}>
        Throw a render error
      </button>
      <p data-test="sampleTelemetryLastResult">{lastResult}</p>
      {exploded && <Exploding />}
    </div>
  );
}

export default TelemetryPanel;
