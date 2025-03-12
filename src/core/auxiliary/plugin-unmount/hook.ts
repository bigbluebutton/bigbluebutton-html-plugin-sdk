import { useEffect, useState } from 'react';
import { HookEvents } from '../../enum';
import { HookEventWrapper, UpdatedEventDetails } from '../../types';
import { MeetingStatusData } from './types';

const useShouldUnmountPlugin = () => {
  const [shouldUnmountPlugin, setShouldUnmountPlugin] = useState(false);

  const handleMeetingStatusChange: EventListener = ((
    customEvent: HookEventWrapper<MeetingStatusData>,
  ) => {
    const eventDetail: UpdatedEventDetails<MeetingStatusData> = (
      customEvent.detail as UpdatedEventDetails<MeetingStatusData>);
    setShouldUnmountPlugin(!eventDetail.data.renderMeeting);
  }) as EventListener;

  useEffect(() => {
    window.addEventListener(HookEvents.BBB_CORE_UPDATED_MEETING_STATUS, handleMeetingStatusChange);
    return () => {
      window.removeEventListener(
        HookEvents.BBB_CORE_UPDATED_MEETING_STATUS,
        handleMeetingStatusChange,
      );
    };
  }, []);

  return shouldUnmountPlugin;
};

export default useShouldUnmountPlugin;
