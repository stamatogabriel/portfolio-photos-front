import styled, { css } from 'styled-components'
import { theme } from '../styles/theme'

interface IContainer {
  open: boolean
  isImage?: boolean
}

export const Container = styled.div<IContainer>`
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: none;
  background-color: ${(props) => (props.isImage ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.6)')};
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform 0.5s cubic-bezier(0.6, -0.28, 0.735, 0.045);
`

export const Content = styled.div<IContainer>`
  @media (max-width: 700px) {
    margin: auto;
    width: 100% !important;
    position: fixed;
    height: 100%;
    max-height: 800px;
    overflow-y: auto;
  }
  @media (max-width: 1100px) {
    width: ${(props) => (props.isImage ? 'auto' : '40%')};
  }
  @media (max-width: 800px) {
    width: ${(props) => (props.isImage ? 'auto' : '50%')};
  }

  background-color: ${(props) =>
    props.isImage ? 'transparent' : theme.colors.background.secondary};
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid ${(props) => (props.isImage ? 'transparent' : theme.colors.white.main)};
  border-radius: 10px;
  width: ${(props) =>
    props.isImage ? 'auto' : '40%'}; /* Could be more or less, depending on screen size */

  ${(props) =>
    props.isImage &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`
