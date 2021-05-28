import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import Input from '../components/input'
import Textarea from '../components/textarea'
import Button from '../components/button'

import { useToast } from '../hooks/toast'

import getValidationError from '../utils/getValidationErrors'

import { Container } from '../components/styles/container'

import styled from 'styled-components'
import api from '../services/api'

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

interface ContactFormData {
  name: string
  motive: string
  email: string
  message: string
}

const Contact: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { formatMessage } = useIntl()
  const t = (id: string): string => formatMessage({ id })
  const router = useRouter()
  const { locale } = router

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: ContactFormData) => {
      setLoading(true)

      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Informe seu nome'),
          motive: Yup.string().required('Informe o motivo'),
          email: Yup.string().required('Informe o seu email').email('Informe um email válido'),
          message: Yup.string().required('Informe a mensagem'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await api.post('/leads', data)

        setLoading(false)

        formRef.current.clearField('name')
        formRef.current.clearField('email')
        formRef.current.clearField('motive')
        formRef.current.clearField('message')

        addToast({
          type: 'success',
          title: 'Mensagem enviada com sucesso',
        })
      } catch (err) {
        setLoading(false)
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err)
          formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Erro no envio da mensagem',
          description: 'Ocorreu um erro ao enviar a mensagem, por favor, tente de novo mais tarde',
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
            <h1>{t('title')}</h1>
            <Input name="name" placeholder={locale === 'en' ? 'Name' : 'Nome'} />
            <Input name="email" placeholder="E-mail" />
            <Input
              name="motive"
              placeholder={locale === 'en' ? 'Reason for your contact' : 'Motivo do seu contato'}
            />
            <Textarea
              name="message"
              placeholder={locale === 'en' ? 'Your message...' : 'Deixe sua mensagem...'}
              rows={5}
            />
            <Button type="submit">{loading ? 'Carregando...' : 'Entrar'}</Button>
          </Form>
        </Content>
        <Background />
      </Wrapper>
    </Container>
  )
}

export default Contact
