import * as React from 'react';
import './style.css';

interface IsModeratorTagProps {
  isModerator: boolean
}

function IsModeratorTag({ isModerator }: IsModeratorTagProps) {
  return (
    <span className="role-tag">
      {isModerator ? 'Moderator' : 'Attendee'}
    </span>
  );
}

export {
  IsModeratorTag,
};
