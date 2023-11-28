export interface JoinUrlParameters {
  enforceLayout?: string;
  'userdata-bbb_display_notifications'?: boolean;
  'userdata-bbb_auto_share_webcam'?: boolean;
  'userdata-bbb_listen_only_mode'?: boolean;
  'userdata-bbb_skip_check_audio'?: boolean;
  'userdata-bbb_skip_video_preview'?: boolean;
  'userdata-bbb_preferred_camera_profile'?: string;
  'userdata-bbb_hide_nav_bar'?: boolean;
  'userdata-bbb_hide_actions_bar'?: boolean;
  'userdata-bbb_self_view_disable'?: boolean;
}

export type GetJoinUrlFunction = (params: JoinUrlParameters) => Promise<string>;
