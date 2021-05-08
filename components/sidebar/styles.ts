import styled, { css } from 'styled-components'
import { lighten } from 'polished'
import { theme } from '../styles/theme'

interface Props {
  item: boolean
}

export const Side = styled.aside`
  background: ${theme.colors.background.secondary};
  width: 20%;
  height: calc(100vh - 85px);
  min-width: 200px;
  margin: 0;
  overflow-y: auto;
  button {
    margin: 10px auto 0;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    cursor: pointer;
    color: ${theme.colors.secondary.main};
    transition: color 0.5s;
    &:hover {
      color: ${theme.colors.secondary.dark};
      svg {
        color: ${theme.colors.secondary.dark};
      }
    }
    svg {
      margin-right: 8px;
      color: ${theme.colors.secondary.main};
      transition: color 0.5s;
    }
  }
  ul {
    width: 100%;
    list-style: none;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  a {
    margin-left: 15px;
    font-size: 0.95rem;
    color: ${theme.colors.white.main};
    &:hover {
      color: ${theme.colors.white.secondary};
    }
  }
`

export const Item = styled.li<Props>`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 10px;
  color: ${theme.colors.white.main};
  transition: background-color 0.5s;
  ${(props) =>
    props.item &&
    css`
      background-color: ${theme.colors.secondary.dark};
      color: ${theme.colors.white.main};
    `}
  &:hover {
    background-color: ${theme.colors.secondary.main};
    color: ${theme.colors.white.secondary};
  }
`

export const IconWrapper = styled.div`
  width: 100%;
  padding: 0 0 0 auto;
  display: flex;
  svg {
    margin: 0 10px 0 auto;
    cursor: pointer;
    transition: color 0.5s;
    &:hover {
      color: ${theme.colors.secondary.dark};
    }
  }
`

export const ImageWrapper = styled.div`
  height: 130px;
  width: 130px;
  border-radius: 50%;
  padding: 1rem;
  background-color: ${theme.colors.secondary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  transition: background-color 0.5s;
  cursor: pointer;
  border: 2px solid ${theme.colors.white.main};
  img {
    transition: opacity 0.5s;
    object-fit: cover;
    height: 130px;
    width: 130px;
    border-radius: 50%;
  }
  svg {
    position: absolute;
    visibility: hidden;
    transition: visibility 0.3s;
  }
  &:hover {
    background-color: ${theme.colors.secondary.main};
    img {
      opacity: 0.3;
    }
    svg {
      visibility: visible;
    }
  }
`

export const DropzoneWrapper = styled.div`
  border: 1px dotted ${theme.colors.white.main};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 50px auto;
  width: 70%;
  min-height: 100px;
  p {
    text-align: center;
    color: ${theme.colors.white.main};
  }
  &:hover {
    border-color: ${lighten(0.4, theme.colors.white.main)};
    p {
      color: ${lighten(0.4, theme.colors.white.main)};
    }
  }
`

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h3 {
    margin: -10px 0 0 0;
  }
  a {
    border: none;
    background: transparent;
    cursor: pointer;
    color: ${theme.colors.white.main};
    transition: color 0.5s;
    margin: 5px 0 0 0;
    font-size: 0.85rem;
    & :hover {
      color: ${theme.colors.white.secondary};
    }
  }
`
