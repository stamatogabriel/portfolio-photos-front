import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  top: 0;
  margin: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 95px;
`

export const LinkWrapper = styled.div`
  display: none;
  margin: 0 0 0 auto;
  @media (min-width: 750px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      margin-left: 35px;
      font-size: 18px;
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
  margin-left: 15px;
`
