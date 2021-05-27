//import { useRouter } from 'next/router'
//import { useIntl } from 'react-intl'

import { GetServerSideProps } from 'next'
import { Parallax } from '../components/styles/paralax'
import { Container } from '../components/styles/container'
import { Avatar } from '../components/styles/avatar'
import Carousel from '../components/carousel'

import api from '../services/api'

import styled from 'styled-components'

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
`

const CustomParallax = styled(Parallax)`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    border: solid 8px #555;
    padding: 20px;
    transition: transform 0.5s;

    span {
      font-size: 2rem;
      color: #555;
      font-weight: 800;
    }

    &:hover {
      transform: scale(1.3);
    }
  }
`

interface HomeType {
  medias: any[]
}

const Home: React.FC<HomeType> = ({ medias }) => {
  //const { formatMessage } = useIntl()
  // const t = (id: string): string => formatMessage({ id })
  // const router = useRouter()
  // const { locale, locales, defaultLocale } = router

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
