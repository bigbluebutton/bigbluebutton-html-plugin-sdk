import * as  React from 'react';
import { useState } from 'react';
import Header from '../header/component';
import Styled from './styles';

interface StickyNoteProps {
  initialTitle?: string;
  initialTextContent?: string;
}

const StickyNote: React.FC<StickyNoteProps> = ({ initialTitle = '', initialTextContent = '' }) => {
  const [title, setTitle] = useState(initialTitle);
  const [inputVisible, setInputVisible] = useState(false);
  const [content, setContent] = useState(initialTextContent);

  const handleOnChange = (newContent: React.FormEvent<HTMLInputElement>) => {
    setContent(newContent.currentTarget.value);
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const toggleInput = () => {
    setInputVisible(!inputVisible);
  };

  return (
    <>
      <Header textContent={content} />
      <Styled.StyledStickyNote>
        <Styled.TitleWrapper>
          {inputVisible ? (
            <Styled.TitleInput
              type="text"
              value={title}
              onChange={handleTitleChange}
              onBlur={toggleInput}
            />
          ) : (
            <Styled.Title onClick={toggleInput}>{title || 'Click to add title'}</Styled.Title>
          )}
        </Styled.TitleWrapper>
        <Styled.Content>
          <Styled.TextArea
            value={content}
            onChange={handleOnChange}
            placeholder="Add your notes here..." 
          />
        </Styled.Content>
      </Styled.StyledStickyNote>
    </>
  );
};

export default StickyNote;
