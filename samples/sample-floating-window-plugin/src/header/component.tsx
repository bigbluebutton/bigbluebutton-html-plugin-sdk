import * as React from 'react';
import Styled from './styles';
import enums from '../utils/events';

interface HeaderProps {
  textContent: string;
}

const Header = ({ textContent }: HeaderProps) => {
  const handleYellowClick = () => {
    dispatchEvent(new CustomEvent( enums.SampleFloatingWindow.MINIMIZE_WINDOW, {
      detail: { textContent },
    }))
  }
  const handleRedClick = () => {
    dispatchEvent(new CustomEvent(enums.SampleFloatingWindow.CLOSE_WINDOW))
  }

  return (
    <Styled.HeaderWrapper>
      <Styled.RedDot onClick={handleRedClick}/>
      <Styled.YellowDot onClick={handleYellowClick} />
    </Styled.HeaderWrapper>
  );
};

export default Header;
