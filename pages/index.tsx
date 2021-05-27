import { useCallback, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import Input from '../components/input'
import Textarea from '../components/textarea'
import Button from '../components/button'

import { Parallax } from '../components/styles/paralax'
import { Container } from '../components/styles/container'
import { Avatar } from '../components/styles/avatar'
import Carousel from '../components/carousel'

import api from '../services/api'

import styled from 'styled-components'

const FormWrapper = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 35px;
  border-radius: 15px;
  width: 35%;

  @media (max-width: 900px) {
    padding: 35px;
    width: 50%;
  }

  @media (max-width: 700px) {
    padding: 35px;
    width: 70%;
  }

  @media (max-width: 600px) {
    padding: 20px;
    width: 95%;
  }
`

const CustomContainer = styled(Container)`
  @media (max-width: 750px) {
    flex-direction: column;

    p {
      text-align: center;
    }
  }

  margin-top: 25px;
  margin-bottom: 25px;

  p {
    margin-left: 25px;
    max-width: 950px;
    line-height: 2.3rem;
    font-size: 1.4rem;
  }

  img {
    height: 300px;
    margin-left: 25px;
  }
`

const CustomParallax = styled(Parallax)`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
  }
`

interface HomeType {
  medias: any[]
}

const Home: React.FC<HomeType> = ({ medias }) => {
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
            </Form>
          </FormWrapper>
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
