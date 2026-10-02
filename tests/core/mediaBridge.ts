// In BigBlueButton 4.0 LiveKit is the default media bridge; bbb-webrtc-sfu is the
// legacy/secondary bridge. Tests therefore run with LiveKit unless MEDIA_BRIDGE
// explicitly selects bbb-webrtc-sfu (same switch as the core's Playwright suite).
// Valid MEDIA_BRIDGE values: 'livekit' (default) | 'bbb-webrtc-sfu'.
const VALID_MEDIA_BRIDGES = ['livekit', 'bbb-webrtc-sfu'];

export const MEDIA_BRIDGE: string = process.env.MEDIA_BRIDGE || 'livekit';
if (!VALID_MEDIA_BRIDGES.includes(MEDIA_BRIDGE)) {
  throw new Error(
    `Invalid MEDIA_BRIDGE "${MEDIA_BRIDGE}". Valid values: ${VALID_MEDIA_BRIDGES.join(', ')}.`,
  );
}
export const isLiveKit: boolean = MEDIA_BRIDGE === 'livekit';

// LiveKit is the server-side default, so the default run needs no create
// parameters. The legacy run overrides that default per meeting.
export function getMediaBridgeCreateParam(): string | undefined {
  return isLiveKit
    ? undefined
    : 'audioBridge=bbb-webrtc-sfu&cameraBridge=bbb-webrtc-sfu&screenShareBridge=bbb-webrtc-sfu';
}
