import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

import { HeaderWrapper, LinkWrapper, LanguageSelect } from './style'
import { Container } from '../styles/container'

export function Header(): JSX.Element {
  const [cookie, setCookie] = useCookies(['NEXT_LOCALE'])
  const router = useRouter()
  const { locale } = router

  const switchLanguage = (localeSwitch: string): any => {
    router.push('/', `/`, { locale: localeSwitch })
    console.log(cookie.NEXT_LOCALE === localeSwitch)
    if (cookie.NEXT_LOCALE !== localeSwitch) {
      setCookie('NEXT_LOCALE', localeSwitch, { path: `/` })
      console.log(cookie.NEXT_LOCALE)
    }
  }
  return (
    <HeaderWrapper>
      <Container>
        <LinkWrapper>
          <Link href="/">
            <a>
              <img src="/assets/Logo.png" alt="Álvaro Schwarcz" height="80" />
            </a>
          </Link>
          <LanguageSelect
            onClick={() => switchLanguage(locale === 'en' ? 'pt' : 'en')}
            title={locale === 'en' ? 'Switch language' : 'Alterar idioma'}
          >
            <img
              height="30px"
              src={locale === 'pt' ? '/icons/united-states-of-america.svg' : '/icons/brazil.svg'}
              alt={locale === 'en' ? 'english' : 'português'}
            />
          </LanguageSelect>
        </LinkWrapper>
      </Container>
    </HeaderWrapper>
  )
}

export default Header
