import { useRouter } from 'next/router'

import { Container, Content } from './styles'
import { FiX } from 'react-icons/fi'
import { useCallback } from 'react'

interface MenuProps {
  close(): void
  open: boolean
}

const Menu: React.FC<MenuProps> = ({ close, open }) => {
  const router = useRouter()
  const { locale } = router

  const toRoute = useCallback(
    (route: string) => {
      router.push(route)
      close()
    },
    [close, router]
  )

  return (
    <Container open={open}>
      <FiX size={30} onClick={close} />
      <Content>
        <button onClick={() => toRoute('/')}>
          <a>Home</a>
        </button>
        <button onClick={() => toRoute('/galery')}>
          <a>{locale === 'en' ? 'Galery' : 'Galeria'}</a>
        </button>
        <button onClick={() => toRoute('/about')}>
          <a>{locale === 'en' ? 'About' : 'Sobre'}</a>
        </button>
        <button onClick={() => toRoute('/contact')}>
          <a>{locale === 'en' ? 'Contact' : 'Contato'}</a>
        </button>
      </Content>
    </Container>
  )
}

export default Menu
