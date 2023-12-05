import styled from 'styled-components';

const StyledStickyNote = styled.div`
  resize: 'vertical';
  width: 250px;
  height: 300px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  font-size: 18px;
  cursor: pointer;
`;

const TitleInput = styled.input`
  font-size: 18px;
  border: none;
  outline: none;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  height: 100%;

  &::placeholder {
    color: #888;
  }
`;

export default {
  TextArea,
  Content,
  TitleInput,
  Title,
  TitleWrapper,
  StyledStickyNote,
}
