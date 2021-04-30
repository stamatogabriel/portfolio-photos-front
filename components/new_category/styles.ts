import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  h2 {
    margin-top: -5px;
  }
  svg {
    margin: 0 10px 0 auto;
    cursor: pointer;
    transition: color 0.5s;
    &:hover {
      color: #aaa;
    }
  }
  form {
    p {
      font-size: 13px;
      margin: 10px 0 0 0;
      color: #777;
    }
  }
`
