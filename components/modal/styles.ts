import styled from 'styled-components'
import { theme } from '../styles/theme'

interface IContainer {
  open: boolean
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
  background-color: rgba(0, 0, 0, 0.6);
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform 0.5s cubic-bezier(0.6, -0.28, 0.735, 0.045);
`

export const Content = styled.div`
  @media (max-width: 700px) {
    margin: auto;
    width: 100% !important;
    position: fixed;
    height: 100%;
    max-height: 800px;
    overflow-y: auto;
    z-index: 100;
  }
  @media (max-width: 1100px) {
    width: 40%;
  }
  @media (max-width: 800px) {
    width: 50%;
  }

  background-color: ${theme.colors.background.secondary};
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid ${theme.colors.white.main};
  border-radius: 10px;
  width: 40%; /* Could be more or less, depending on screen size */
`
