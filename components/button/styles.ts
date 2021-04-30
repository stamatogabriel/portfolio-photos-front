import styled from 'styled-components'
import { shade } from 'polished'

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
  background: ${(props) => props.colorButton || '#fff'};

  &:hover {
    background: ${shade(0.2, '#fff')};
  }
`
