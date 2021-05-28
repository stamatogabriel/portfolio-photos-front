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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    border-left: 4px solid ${theme.colors.secondary.main};
    border-right: 4px solid ${theme.colors.secondary.main};
    transform: scaleY(0);
  }

  &:after {
    border-bottom: 4px solid ${theme.colors.secondary.main};
    border-top: 4px solid ${theme.colors.secondary.main};
    transform: scaleX(0);
  }

  &:hover {
    z-index: 20;
    transform: scale(1.2);

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
