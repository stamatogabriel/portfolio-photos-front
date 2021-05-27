import styled from 'styled-components'
import { theme } from './theme'

export const Avatar = styled.img`
  border-radius: 99999px;
  border: 5px solid ${theme.colors.secondary.dark};
  max-height: 12rem;
  max-width: 12rem;
`
