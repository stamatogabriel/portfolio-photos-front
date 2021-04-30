import styled from 'styled-components'
import { lighten } from 'polished'

import { Container } from '../../../components/styles/container'
import { Table } from '../../../components/styles/table'

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

export const CustomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`

export const SpinWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

// export const CustomButton = styled(Button)`
//   margin: 0 0 20px auto;
//   width: 30%;
// `

export const CustomTable = styled(Table)`
  svg {
    transition: color 0.5s;
    z-index: 3;
    cursor: pointer;
    &:hover {
      color: #e01200;
    }
  }
`

export const Pagination = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    margin: 0 15px;
    border: 1px solid #222;
    background: transparent;
    border-radius: 50px;
    cursor: pointer;
    color: #222;
    font-size: 15px;
    line-height: 24px;
    transition: font-weight 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    &:hover {
      font-weight: 700;
    }
    &:disabled {
      cursor: not-allowed;
      color: ${lighten(0.2, '#222')};
      border-color: ${lighten(0.2, '#222')};
    }
  }
`
