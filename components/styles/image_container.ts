import styled from 'styled-components'
import { theme } from './theme'

export const ImageContainer = styled.div`
  display: block;
  height: 100%;
  position: relative;
  will-change: border-color;
  transition: transform 0.5s;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 7px;
  cursor: pointer;

  div {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    transition: display 0.5s;

    p {
      text-align: center;
    }
  }

  h3 {
    text-align: center;
    margin: 5px;
    width: 100%;
  }

  img {
    width: 100%;
    border-radius: 7px 7px 0 0;
    cursor: pointer;
  }

  &:after,
  &:before {
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: transform 0.5s;
    border-radius: 7px;
  }

  &:before {
    border-left: 2px solid ${theme.colors.secondary.main};
    border-right: 2px solid ${theme.colors.secondary.main};
    transform: scaleY(0);
  }

  &:after {
    border-bottom: 2px solid ${theme.colors.secondary.main};
    border-top: 2px solid ${theme.colors.secondary.main};
    transform: scaleX(0);
  }

  &:hover {
    transform: scale(1.1);

    div {
      display: block;
    }

    &:before {
      transform: scaleY(1);
    }
    &:after {
      transform: scaleX(1);
    }
  }
`
