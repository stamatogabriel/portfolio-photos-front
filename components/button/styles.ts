import styled from 'styled-components'
import { shade } from 'polished'
import { theme } from '../styles/theme'

interface Props {
  colorButton?: string
}

export const CustomButton = styled.button<Props>`
  width: 100%;
  border-radius: 8px;
  margin-top: 16px;
  height: 56px;
  font-weight: 500;
  transition: background-color 0.5s;
  border: none;
  color: ${theme.colors.white.main};
  font-weight: 600;
  background: ${(props) => props.colorButton || theme.colors.secondary.dark};
  cursor: pointer;

  &:hover {
    background: ${shade(0.2, theme.colors.secondary.dark)};
  }
`
