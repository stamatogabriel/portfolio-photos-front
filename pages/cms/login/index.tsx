import { useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { useAuth } from '../../../hooks/auth_context'
import { useToast } from '../../../hooks/toast'

import getValidationError from '../../../utils/getValidationErrors'

import { FaMailBulk } from 'react-icons/fa'

import { Container } from '../../../components/styles/container'
import Input from '../../../components/input'
import Button from '../../../components/button'

import { Background, Content, Wrapper } from './styles'

interface SignInFormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { signIn } = useAuth()
  const { addToast } = useToast()

  const router = useRouter()

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
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

        router.push('/cms')
      } catch (err) {
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
            <Input name="email" icon={FaMailBulk} placeholder="E-mail" />
            <Input name="password" type="password" placeholder="Senha" />
            <Button type="submit">Entrar</Button>
            <a>Esqueci minha senha</a>
          </Form>
        </Content>
        <Background></Background>
      </Wrapper>
    </Container>
  )
}

export default Login
