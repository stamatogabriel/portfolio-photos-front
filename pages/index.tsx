//import { useRouter } from 'next/router'
//import { useIntl } from 'react-intl'

import { Parallax } from '../components/styles/paralax'

import styled from 'styled-components'

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

const Home: React.FC = () => {
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
    </div>
  )
}

export default Home
