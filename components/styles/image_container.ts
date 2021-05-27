import styled from 'styled-components'
import { theme } from './theme'

export const ImageContainer = styled.div`
  display: block;
  height: 100%;
  position: relative;
  will-change: border-color;
  transition: transform 0.5s;
  border-radius: 7px;
  cursor: pointer;
  width: 100%;
  height: auto;
  margin: 15px 0;

  img {
    width: 100%;
    border-radius: 7px;
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
    border-bottom: 3px solid ${theme.colors.secondary.main};
    border-top: 3px solid ${theme.colors.secondary.main};
    transform: scaleX(0);
  }

  &:hover {
    z-index: 20;
    //transform: scale(1.1);

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
