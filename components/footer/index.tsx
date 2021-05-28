import { useRouter } from 'next/router'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'

import { Container, SocialContainer } from './styles'

const Footer: React.FC = () => {
  const year = new Date()
  const router = useRouter()
  const { locale } = router

  return (
    <Container>
      <SocialContainer>
        <a href="https://www.google.com" target="__blank">
          <FaFacebookF size={21} />
        </a>
        <a href="https://instagram.com/schwarcz_photography?utm_medium=copy_link" target="__blank">
          <FaInstagram size={22} />
        </a>
        <a href="https://www.google.com" target="__blank">
          <FaYoutube size={22} />
        </a>
      </SocialContainer>
      <p>
        © {year.getFullYear()} SCHWARCZ PHOTOGRAPHY -{' '}
        {locale === 'en' ? 'ALL RIGHTS RESERVED' : 'TODOS OS DIREITOS RESERVADOS'}
      </p>
      <a href="mailto:gabriel@pandoratechsolutions.com">
        Developed by: Pandora Soluções em Tecnologia
      </a>
    </Container>
  )
}

export default Footer
