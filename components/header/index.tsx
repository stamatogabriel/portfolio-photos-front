import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { FiMenu } from 'react-icons/fi'

import Menu from '../menu'

import { HeaderWrapper, LinkWrapper, LanguageSelect } from './style'
import { Container } from '../styles/container'
import { useCallback, useState } from 'react'

export function Header(): JSX.Element {
  const [cookie, setCookie] = useCookies(['NEXT_LOCALE'])
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const router = useRouter()
  const { locale } = router

  const switchLanguage = (localeSwitch: string): any => {
    router.push('/', `/`, { locale: localeSwitch })
    if (cookie.NEXT_LOCALE !== localeSwitch) {
      setCookie('NEXT_LOCALE', localeSwitch, { path: `/` })
    }
  }

  const closeModal = useCallback(() => {
    setOpenMenu(false)
  }, [])

  const handleOpenModal = useCallback(() => {
    setOpenMenu(true)
  }, [])

  return (
    <HeaderWrapper>
      <Container>
        {!openMenu && (
          <LanguageSelect onClick={() => handleOpenModal()}>
            <a>
              <FiMenu size={32} />
            </a>
          </LanguageSelect>
        )}
        <Menu close={closeModal} open={openMenu} />
        <LinkWrapper>
          <Link href="/">
            <a>
              <img src="/assets/Logo.png" alt="Álvaro Schwarcz" height="80" />
            </a>
          </Link>
        </LinkWrapper>
        <LanguageSelect
          onClick={() => switchLanguage(locale === 'en' ? 'pt' : 'en')}
          title={locale === 'en' ? 'Switch language' : 'Alterar idioma'}
        >
          <a>
            <img
              height="30px"
              src={locale === 'pt' ? '/icons/united-states-of-america.svg' : '/icons/brazil.svg'}
              alt={locale === 'en' ? 'english' : 'português'}
            />
          </a>
        </LanguageSelect>
      </Container>
    </HeaderWrapper>
  )
}

export default Header
