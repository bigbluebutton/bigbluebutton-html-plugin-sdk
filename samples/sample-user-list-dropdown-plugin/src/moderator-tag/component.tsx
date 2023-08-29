import * as React from 'react';
import './style.css';

interface IsModeratorTagProps {
  isModerator: boolean
}

function ModeratorTag({ isModerator }: IsModeratorTagProps) {
  return (
    <span className="role-tag">
      {isModerator ? 'Moderator' : 'Attendee'}
    </span>
  );
}

export {
  ModeratorTag,
};
