import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { useAuth } from '../../hooks/auth_context'
import { useToast } from '../../hooks/toast'

import getValidationError from '../../utils/getValidationErrors'

import { FiMail, FiLock } from 'react-icons/fi'

import { Container } from '../../components/styles/container'
import Input from '../../components/input'
import Button from '../../components/button'

import styled from 'styled-components'

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

interface SignInFormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { signIn } = useAuth()
  const { addToast } = useToast()

  const router = useRouter()

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      setLoading(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string().required('Informe o seu email').email('Informe um email válido'),
          password: Yup.string().min(6, 'Senha deve conter pelo menos seis caracteres'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await signIn({
          email: data.email,
          password: data.password,
        })

        setLoading(false)
        router.push('/cms')
      } catch (err) {
        setLoading(false)
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err)
          formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        })
      }
    },
    [addToast, router, signIn]
  )

  return (
    <Container>
      <Wrapper>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit} autoComplete="false">
            <h1>Faça seu login</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
            <Button type="submit">{loading ? 'Carregando...' : 'Entrar'}</Button>
            <Link href="/cms/forgot_pass">
              <a>Esqueci minha senha</a>
            </Link>
          </Form>
        </Content>
        <Background></Background>
      </Wrapper>
    </Container>
  )
}

export default Login
