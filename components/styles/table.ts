import styled from 'styled-components'

export const Table = styled.table`
  width: 100%;
  padding: 10px;
  border-spacing: 0.5rem;
  border-collapse: collapse;
  thead {
    background: #333;
    color: #fff;
  }
  tr {
    height: 30px;
  }
  th,
  td {
    text-align: left;
    padding: 0.5rem;
  }
  tbody {
    tr {
      transition: background-color 0.5s;
      &:hover {
        background-color: #aaa;
      }
    }
  }
`
