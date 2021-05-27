import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
// import * as Yup from 'yup'

import Input from '../components/input'
import Textarea from '../components/textarea'
import Button from '../components/button'

// import { useToast } from '../hooks/toast'

// import getValidationError from '../utils/getValidationErrors'

import { Container } from '../components/styles/container'

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

const Contact: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { formatMessage } = useIntl()
  const t = (id: string): string => formatMessage({ id })
  const router = useRouter()
  const { locale } = router

  // const { addToast } = useToast()

  const handleSubmit = useCallback(() => {
    return setLoading(true)
  }, [])

  return (
    <Container>
      <Wrapper>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit} autoComplete="false">
            <h1>{t('title')}</h1>
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
