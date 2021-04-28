import styled, { css } from 'styled-components'
import Tooltip from '../tooltip'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  padding: 1rem;
  width: 100%;
  border-radius: 8px;
  border: solid 1px #333;

  ${(props) =>
    props.isErrored &&
    css`
      color: #c53030;
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: yellow;
      border-color: yellow;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: yellow;
    `}

  display: flex;
  align-items: center;

  input {
    background: transparent;
    flex: 1;
    border: 0;
  }

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
  }
`

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`
