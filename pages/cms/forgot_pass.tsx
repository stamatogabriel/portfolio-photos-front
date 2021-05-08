import { useCallback, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { useToast } from '../../hooks/toast'

import getValidationError from '../../utils/getValidationErrors'

import { FiMail } from 'react-icons/fi'

import { Container } from '../../components/styles/container'
import Input from '../../components/input'
import Button from '../../components/button'

import styled from 'styled-components'
import api from '../../services/api'

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
  email: string
}

const ForgotPass: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: ForgetFormData) => {
      setLoading(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string().required('Informe o seu email').email('Informe um email válido'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await api.post('/auth/forgot_pass', data)

        setLoading(false)
        addToast({
          type: 'success',
          title: 'Verifique seu email',
          description: 'Um email foi enviado com o link para recuperação da sua senha',
        })
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
    [addToast]
  )

  return (
    <Container>
      <Wrapper>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit} autoComplete="false">
            <h1>Recuperar senha</h1>
            <p>Para recuperar seu acesso, preencha o campo com o email cadastrado.</p>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Button type="submit">{loading ? 'Carregando...' : 'Recuperar senha'}</Button>
          </Form>
        </Content>
        <Background></Background>
      </Wrapper>
    </Container>
  )
}

export default ForgotPass
