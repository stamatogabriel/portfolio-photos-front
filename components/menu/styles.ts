import styled from 'styled-components'
import { theme } from '../styles/theme'

interface IMenuProps {
  open: boolean
}

export const Container = styled.div<IMenuProps>`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.9);
  overflow-x: hidden;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;

  svg {
    position: absolute;
    top: 0;
    right: 0;
    margin: 1.5rem;
    cursor: pointer;
  }
`

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 25%; /* 25% from the top */
  width: 100%; /* 100% width */
  text-align: center; /* Centered text/links */
  margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */

  a {
    padding: 8px;
    text-decoration: none;
    font-size: 36px;
    display: block; /* Display block instead of inline */
    transition: 0.3s; /* Transition effects on hover (color) */
  }

  button {
    border: none;
    background: transparent;
    color: ${theme.colors.white.main};
    cursor: pointer;
  }
`
