import { useCallback, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { useToast } from '../../hooks/toast'

import getValidationError from '../../utils/getValidationErrors'

import { FiLock } from 'react-icons/fi'

import { Container } from '../../components/styles/container'
import Input from '../../components/input'
import Button from '../../components/button'

import styled from 'styled-components'
import api from '../../services/api'
import { useRouter } from 'next/router'

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    min-width: 300px;
    width: 100%;
  }

  h1 {
    margin-bottom: 24px;
  }

  a {
    margin-top: 24px;
    display: block;
  }
`

export const Wrapper = styled.div`
  height: calc(100vh - 150px);

  display: flex;
  align-items: stretch;
`

export const Background = styled.div`
  flex: 1;
  background-size: cover;
`

interface ForgetFormData {
  password: string
  confirm_password: string
}

interface IReset {
  token?: string
}

const ResetPass: React.FC<IReset> = ({ token }) => {
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { addToast } = useToast()
  const router = useRouter()

  const handleSubmit = useCallback(
    async (data: ForgetFormData) => {
      setLoading(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'Senha deve conter pelo menos seis caracteres'),
          confirm_password: Yup.string().min(6, 'Senha deve conter pelo menos seis caracteres'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        if (data.password !== data.confirm_password) {
          setLoading(false)
          return addToast({
            type: 'error',
            title: 'Senhas não conferem',
            description: 'As senhas digitadas não conferem, por favor, tente novamente.',
          })
        }

        await api.post('/auth/reset_pass', {
          password: data.password,
          token,
        })

        setLoading(false)
        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso',
        })
        router.push('/cms/login')
      } catch (err) {
        setLoading(false)
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err)
          formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Não foi possível resear a senha, tente novamente mais tarde.',
        })
      }
    },
    [addToast, router, token]
  )

  return (
    <Container>
      <Wrapper>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit} autoComplete="false">
            <h1>Recuperar senha</h1>
            <p>Digite sua nova senha.</p>
            <Input name="password" type="password" icon={FiLock} placeholder="Digite sua senha" />
            <Input
              name="confirm_password"
              type="password"
              icon={FiLock}
              placeholder="Confirme sua senha"
            />
            <Button type="submit">{loading ? 'Carregando...' : 'Redefinir senha'}</Button>
          </Form>
        </Content>
        <Background></Background>
      </Wrapper>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const token = query.token

  if (!token) {
    return {
      redirect: {
        destination: '/cms/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      token,
    },
  }
}

export default ResetPass
