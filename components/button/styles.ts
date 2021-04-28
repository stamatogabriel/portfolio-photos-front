import styled from 'styled-components'
import { shade } from 'polished'

export const CustomButton = styled.button`
  width: 100%;
  border-radius: 8px;
  margin-top: 16px;
  height: 56px;
  font-weight: 500;
  transition: background-color 0.5s;

  &:hover {
    background: ${shade(0.2, '#fff')};
  }
`
