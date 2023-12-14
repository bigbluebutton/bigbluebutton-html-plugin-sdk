import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 5px;
  cursor: pointer;
  position: relative;

  &:hover::before {
    content: attr(data-icon); /* Show the icon content on hover */
    position: absolute;
    top: 40%; /* Adjust the position as needed */
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
    pointer-events: none;
  }

  &:hover {
    opacity: 0.7; /* Reduce opacity on hover */
  }
`;

const RedDot = styled(Dot)`
  background-color: #ff5f57;
`;

const YellowDot = styled(Dot)`
  background-color: #ffbd2e;
`;

export default {
  HeaderWrapper,
  Dot,
  RedDot,
  YellowDot,
};
