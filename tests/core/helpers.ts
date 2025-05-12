import { expect, Page } from '@playwright/test';
import sha from 'sha.js';
import xml2js from 'xml2js';
import axios from 'axios';
import {
  attendeePW, fullName, moderatorPW, secret, server,
} from './parameters';

declare global {
  interface Window {
    meetingClientSettings: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      public: any;
    };
  }
}

interface getJoinURLParams {
  meetingID: string;
  isModerator: boolean;
  joinParameter?: string;
  skipSessionDetailsModal?: boolean;
}

export interface SessionSettings {
  reactionsButton: boolean;
  sharedNotesEnabled: boolean;
  directLeaveButton: boolean;
  // Audio
  autoJoinAudioModal: boolean;
  listenOnlyMode: boolean;
  forceListenOnly: boolean;
  skipEchoTest: boolean;
  skipEchoTestOnJoin: boolean;
  skipEchoTestIfPreviousDevice: boolean;
  speechRecognitionEnabled: boolean;
  // Chat
  chatEnabled: boolean;
  publicChatOptionsEnabled: boolean;
  maxMessageLength: number;
  emojiPickerEnabled: boolean;
  autoConvertEmojiEnabled: boolean;
  // Polling
  pollEnabled: boolean;
  pollChatMessage: boolean;
  // Presentation
  originalPresentationDownloadable: boolean;
  presentationWithAnnotationsDownloadable: boolean;
  externalVideoPlayer: boolean;
  hidePresentationOnJoin: boolean;
  // Screensharing
  screensharingEnabled: boolean;
  // Timeouts
  listenOnlyCallTimeout: number;
  videoPreviewTimeout: number;
  // Webcam
  webcamSharingEnabled: boolean;
  skipVideoPreview: boolean;
  skipVideoPreviewOnFirstJoin: boolean;
  skipVideoPreviewIfPreviousDevice: boolean;
  // Emoji
  emojiRain: boolean;
}

function getChecksum(text) {
  let algorithm = (process.env.CHECKSUM || '').toLowerCase();
  if (!['sha1', 'sha256', 'sha512'].includes(algorithm)) {
    switch (secret?.length) {
      case 128:
        algorithm = 'sha512';
        break;
      case 64:
        algorithm = 'sha256';
        break;
      case 40:
      default:
        algorithm = 'sha1';
    }
  }
  return sha(algorithm).update(text).digest('hex');
}

function getRandomInt(min, max) {
  const adjustedMin = Math.ceil(min);
  const adjustedMax = Math.floor(max);
  return Math.floor(Math.random() * (adjustedMax - adjustedMin)) + adjustedMin;
}

function createMeetingUrl(params, createParameter) {
  const meetingID = `random-${getRandomInt(1000000, 10000000).toString()}`;
  const mp = params.moderatorPW;
  const ap = params.attendeePW;
  const baseQuery = `name=${meetingID}&meetingID=${meetingID}&attendeePW=${ap}&moderatorPW=${mp}`
    + `&allowStartStopRecording=true&autoStartRecording=false&welcome=${params.welcome}`;
  const query = createParameter !== undefined ? `${baseQuery}&${createParameter}` : baseQuery;
  const apiCall = `create${query}${params.secret}`;
  const checksum = getChecksum(apiCall);
  const url = `${params.server}/create?${query}&checksum=${checksum}`;
  return url;
}

function createMeetingPromise(params, createParameter) {
  const url = createMeetingUrl(params, createParameter);
  return axios.get(url, { adapter: 'http' });
}

export async function createMeeting(params, createParameter) {
  const promise = createMeetingPromise(params, createParameter);
  const response = await promise;
  expect(response.status).toEqual(200);
  const xmlResponse = await xml2js.parseStringPromise(response.data);
  return xmlResponse.response.meetingID[0];
}

export function getJoinURL({
  meetingID, isModerator, joinParameter, skipSessionDetailsModal,
}: getJoinURLParams) {
  const pw = isModerator ? moderatorPW : attendeePW;
  const shouldSkipSessionDetailsModal = skipSessionDetailsModal ? '&userdata-bbb_show_session_details_on_join=false' : ''; // default value in settings.yml is true
  const baseQuery = `fullName=${fullName}&meetingID=${meetingID}&password=${pw}${shouldSkipSessionDetailsModal}`;
  const query = joinParameter ? `${baseQuery}&${joinParameter}` : baseQuery;
  const apiCall = `join${query}${secret}`;
  const checksum = getChecksum(apiCall);
  return `${server}/join?${query}&checksum=${checksum}`;
}

export function encodeCustomParams(param: string): string {
  try {
    const splitted = param.split('=');
    if (splitted.length > 2) {
      const aux = splitted.shift();
      splitted[1] = splitted.join('=');
      splitted[0] = aux || '';
    }
    splitted[1] = encodeURIComponent(splitted[1]).replace(/%20/g, '+');
    return splitted.join('=');
  } catch (err) {
    throw new Error(`Error encoding custom params: ${err}`);
  }
}

export async function generateSettingsData(page: Page): Promise<SessionSettings> {
  try {
    const settingsData = await page.evaluate(() => window.meetingClientSettings.public);

    const settings = {
      reactionsButton: settingsData.app?.reactionsButton?.enabled,
      sharedNotesEnabled: settingsData.notes?.enabled,
      directLeaveButton: settingsData.app?.defaultSettings?.application?.directLeaveButton,
      // Audio
      autoJoinAudioModal: settingsData.app?.autoJoin,
      listenOnlyMode: settingsData.app?.listenOnlyMode,
      forceListenOnly: settingsData.app?.forceListenOnly,
      skipEchoTest: settingsData.app?.skipCheck,
      skipEchoTestOnJoin: settingsData.app?.skipCheckOnJoin,
      skipEchoTestIfPreviousDevice: settingsData.app?.skipEchoTestIfPreviousDevice,
      speechRecognitionEnabled: settingsData.app?.audioCaptions?.enabled,
      // Chat
      chatEnabled: settingsData.chat?.enabled,
      publicChatOptionsEnabled: settingsData.chat?.enableSaveAndCopyPublicChat,
      maxMessageLength: settingsData.chat?.max_message_length,
      emojiPickerEnabled: settingsData.chat?.emojiPicker?.enable,
      autoConvertEmojiEnabled: settingsData.chat?.autoConvertEmoji,
      // Polling
      pollEnabled: settingsData.poll?.enabled,
      pollChatMessage: settingsData.poll?.chatMessage,
      // Presentation
      originalPresentationDownloadable: settingsData.presentation?.allowDownloadOriginal,
      presentationWithAnnotationsDownloadable:
        settingsData.presentation?.allowDownloadWithAnnotations,
      externalVideoPlayer: settingsData.externalVideoPlayer?.enabled,
      hidePresentationOnJoin: settingsData.layout?.hidePresentationOnJoin,
      // Screensharing
      screensharingEnabled: settingsData.kurento?.enableScreensharing,
      // Timeouts
      listenOnlyCallTimeout: parseInt(settingsData.media?.listenOnlyCallTimeout, 10),
      videoPreviewTimeout: parseInt(settingsData.kurento?.gUMTimeout, 10),
      // Webcam
      webcamSharingEnabled: settingsData.kurento?.enableVideo,
      skipVideoPreview: settingsData.kurento?.skipVideoPreview,
      skipVideoPreviewOnFirstJoin: settingsData.kurento?.skipVideoPreviewOnFirstJoin,
      skipVideoPreviewIfPreviousDevice: settingsData.kurento?.skipVideoPreviewIfPreviousDevice,
      // Emoji
      emojiRain: settingsData.app?.emojiRain?.enabled,
    };

    return settings;
  } catch (err) {
    throw new Error(`Error generating settings data: ${err}`);
  }
}
