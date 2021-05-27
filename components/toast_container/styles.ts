import styled, { css } from 'styled-components'
import { animated } from 'react-spring'

interface ToastProps {
  type?: 'success' | 'error' | 'info'
  hasDescription: boolean
}

const toastTypeVariation = {
  info: css`
    background: #ebf8ff;
    color: #7172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
}

export const Container = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 30px;
  overflow: hidden;
  z-index: 10;
`

export const Toast = styled(animated.div)<ToastProps>`
  width: 360px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  & + div {
    margin-top: 8px;
  }

  ${(props) => toastTypeVariation[props.type || 'info']};

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 0.9rem;
      opacity: 0.8;
      line-height: 1.1rem;
    }
  }

  button {
    position: absolute;
    right: 8px;
    top: 15px;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${(props) =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`
