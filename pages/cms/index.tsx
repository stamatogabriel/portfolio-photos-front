import React from 'react'

import Sidebar from '../../components/sidebar'

import { Container } from '../../components/styles/container'

import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
`

function Dashboard(): JSX.Element {
  return (
    <Wrapper>
      <Sidebar selected="dash" />
      <Container>Teste</Container>
    </Wrapper>
  )
}

export default Dashboard
