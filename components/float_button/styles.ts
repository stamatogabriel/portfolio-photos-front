import styled from 'styled-components'
import { theme } from '../styles/theme'
import { lighten } from 'polished'

export const CustomButton = styled.button`
  position: absolute;
  right: 25px;
  bottom: 25px;
  height: 65px;
  width: 65px;
  border-radius: 999px;
  border: none;
  background: ${theme.colors.secondary.dark};
  transition: background-color 0.5s;
  cursor: pointer;

  &:hover {
    background: ${lighten(0.25, theme.colors.secondary.dark)};
  }
`
