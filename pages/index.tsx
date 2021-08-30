import { useCallback, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import Input from '../components/input'
import Textarea from '../components/textarea'
import Button from '../components/button'

import { Parallax } from '../components/styles/paralax'
import { Container } from '../components/styles/container'
import { Avatar } from '../components/styles/avatar'
import Carousel from '../components/carousel'

import getValidationError from '../utils/getValidationErrors'

import api from '../services/api'

import styled from 'styled-components'
import { theme } from '../components/styles/theme'
import { lighten } from 'polished'

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 35px;
  border-radius: 15px;
  width: 35%;
  margin: 15px;

  @media (max-width: 900px) {
    padding: 35px;
    width: 50%;
  }

  @media (max-width: 700px) {
    padding: 35px;
    width: 95%;
  }
`

const Error = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  text-align: center;
  color: ${lighten(0.1, theme.colors.error)};
`

const Success = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  text-align: center;
  color: #e6fffa;
`

const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 35px;
  border-radius: 15px;
  width: 55%;

  @media (max-width: 900px) {
    padding: 35px;
    width: 40%;
  }

  @media (max-width: 700px) {
    padding: 35px;
    width: 95%;
  }
`

const CustomContainer = styled(Container)`
  @media (max-width: 800px) {
    flex-direction: column;

    p {
      text-align: center;
    }
  }

  margin-top: 25px;
  margin-bottom: 25px;

  p {
    max-width: 950px;
    line-height: 2.3rem;
    font-size: 1.4rem;
  }

  img {
    height: 300px;
    margin: 0 45px;
  }
`

const CustomParallax = styled(Parallax)`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 700px) {
    > div {
      flex-direction: column-reverse;
    }
  }
`

interface HomeType {
  medias: any[]
}

interface ContactFormData {
  name: string
  motive: string
  email: string
  message: string
}

const Home: React.FC<HomeType> = ({ medias }) => {
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const { formatMessage } = useIntl()
  const t = (id: string): string => formatMessage({ id })
  const router = useRouter()
  const { locale } = router

  const handleSubmit = useCallback(async (data: ContactFormData) => {
    setLoading(true)

    try {
      formRef.current?.setErrors({})
      setError(false)
      setSuccess(false)

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

      setSuccess(true)
    } catch (err) {
      setError(true)
      setLoading(false)
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationError(err)
        formRef.current?.setErrors(errors)
      }
    }
  }, [])

  return (
    <div>
      <CustomParallax image="https://estounaviagem.com.br/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2019/05/Fotos-de-Paisagem-Lindas-Saint-Kilda.jpg.webp">
        <div>
          <span>Schwarcz Photos</span>
        </div>
      </CustomParallax>
      <CustomContainer>
        <Avatar src="assets/avatar.png" alt="Álvaro Schwarcz" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </CustomContainer>
      <Carousel data={medias} isImages />
      <CustomContainer>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <img src="assets/image_home.jpg" alt="Example" />
      </CustomContainer>
      <CustomParallax image="https://estounaviagem.com.br/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2019/05/Fotos-de-Paisagem-Lindas-Saint-Kilda.jpg.webp">
        <Container>
          <FormWrapper>
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
              <Button type="submit">
                {loading
                  ? locale === 'en'
                    ? 'Sending...'
                    : 'Enviando...'
                  : locale === 'en'
                  ? 'Send'
                  : 'Enviar'}
              </Button>
              {error && <Error>{t('error')}</Error>}
              {success && <Success>{t('success')}</Success>}
            </Form>
          </FormWrapper>
          <ContentWrapper>
            <h2>Teste</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus quibusdam, quae
              eligendi distinctio molestiae aliquam illum veritatis! Iusto velit vel placeat commodi
              cupiditate quam fuga sint impedit saepe, totam dicta!
            </p>
          </ContentWrapper>
        </Container>
      </CustomParallax>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get(`/medias`)

  const { medias } = response.data

  return {
    props: {
      medias,
    },
  }
}

export default Home
