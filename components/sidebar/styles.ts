import styled, { css } from 'styled-components'
import { lighten } from 'polished'

interface Props {
  item: boolean
}

export const Side = styled.div`
  background: #ccc;
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
    color: #555;
    transition: color 0.5s;
    &:hover {
      color: #000;
      svg {
        color: #000;
      }
    }
    svg {
      margin-right: 8px;
      color: #555;
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
    &:hover {
      color: #000;
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
  color: #555;
  transition: background-color 0.5s;
  ${(props) =>
    props.item &&
    css`
      background-color: #bbb;
      color: #000;
    `}
  &:hover {
    background-color: #bbb;
    color: #000;
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
      color: #aaa;
    }
  }
`

export const ImageWrapper = styled.div`
  height: 130px;
  width: 130px;
  border-radius: 50%;
  padding: 1rem;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  transition: background-color 0.5s;
  cursor: pointer;
  border: 2px solid #333;
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
    background-color: #aaa;
    img {
      opacity: 0.3;
    }
    svg {
      visibility: visible;
    }
  }
`

export const DropzoneWrapper = styled.div`
  border: 1px dotted #333;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 50px auto;
  width: 70%;
  min-height: 100px;
  p {
    text-align: center;
    color: #333;
  }
  &:hover {
    border-color: ${lighten(0.4, '#333')};
    p {
      color: ${lighten(0.4, '#333')};
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
    color: #555;
    transition: color 0.5s;
    margin: 5px 0 0 0;
    font-size: 0.85rem;
    & :hover {
      color: #000;
    }
  }
`
