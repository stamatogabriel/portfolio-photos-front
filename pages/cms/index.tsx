import { GetServerSideProps } from 'next'

import Sidebar from '../../components/sidebar'

import { Container } from '../../components/styles/container'

import styled from 'styled-components'
import { useAuth } from '../../hooks/auth_context'

export const Wrapper = styled.div`
  display: flex;
`

const CustomContainer = styled(Container)`
  flex-direction: column;
  justify-content: flex-start;

  p {
    margin: 0;
    line-height: 1.5rem;
  }
`

function Dashboard(): JSX.Element {
  const { user } = useAuth()

  return (
    <Wrapper>
      <Sidebar selected="dash" />
      <CustomContainer>
        <h1>Bem vindo, {user?.name}!</h1>
        <p>Este é o painel de gerenciamento do site Álvaro Schwarcz.</p>
        <p>Aqui, você poderá incluir, editar e remover os conteúdos mostrados no site.</p>
      </CustomContainer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies['@Portfolio_access_token']?.toString()

  if (!token) {
    return {
      redirect: {
        destination: '/cms/login',
        permanent: false,
      },
    }
  }

  return { props: { message: 'ok' } }
}

export default Dashboard
