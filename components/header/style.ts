import styled from 'styled-components'
import { theme } from '../styles/theme'

export const HeaderWrapper = styled.header`
  top: 0;
  margin: 0;
  width: 100vw;
  position: fixed;
  z-index: 30;
  background-color: ${theme.colors.background.main};
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 95px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
`

export const LinkWrapper = styled.div`
  display: none;
  margin: 0 0 0 auto;
  @media (min-width: 750px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      margin: 0 35px;
      font-size: 1.4rem;
    }
  }
`

export const MobileWrapper = styled.div`
  svg {
    cursor: pointer;
  }
  @media (min-width: 750px) {
    display: none;
  }
`

export const LanguageSelect = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  margin: 0;
  padding: 0;
  width: 30;

  svg {
    color: ${theme.colors.black.main};
    transition: color 0.5s;
    padding: 0;

    &:hover {
      color: #ccc;
    }
  }
`
