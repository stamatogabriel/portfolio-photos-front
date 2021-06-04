/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import CookieConsent from 'react-cookie-consent'
import { ThemeProvider } from 'styled-components'
import { IntlProvider } from 'react-intl'
import NProgress from 'nprogress'

import * as locales from '../content/locale'

import { GlobalStyle } from '../components/styles/global'
import { theme } from '../components/styles/theme'

import { AppProvider } from '../hooks'

import { Header } from '../components/header'
import Footer from '../components/footer'
import { Container } from '../components/styles/container'
import Link from 'next/link'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }): JSX.Element {
  const router = useRouter()
  const { locale, defaultLocale, pathname } = router
  const localeCopy = locales[locale]
  const messages = localeCopy[pathname]

  return (
    <IntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages}>
      <Head>
        <title>Álvaro Schwarcz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Álvaro Schwarcz" />
        <meta name="keywords" content="Álvaro Schwarcz" />
        <meta name="og:image" content="/assets/Logo.png" />
        <meta charSet="UTF-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="/styles/nprogress.css" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
          <CookieConsent
            location="bottom"
            buttonText={locale === 'en' ? 'I understand!' : 'Eu aceito!'}
            cookieName="myAwesomeCookieName2"
            style={{
              background: '#ccc',
              color: '#333',
              textAlign: 'center',
            }}
            buttonStyle={{
              background: '#0F3B0C',
              color: '#fff',
              fontSize: '1rem',
              borderRadius: '7px',
            }}
            declineButtonStyle={{ fontSize: '1rem', borderRadius: '7px' }}
            expires={150}
          >
            <Container>
              <p>
                {locale === 'en'
                  ? 'This website uses cookies to enhance the user experience.'
                  : 'Este site utiliza cookies para melhorar sua experiência. Para saber mais visite nossa '}
                <Link href="/privacy_policy">
                  <a>{locale === 'en' ? 'Privacy Policy' : 'Política de Privacidade'}</a>
                </Link>
              </p>
            </Container>
          </CookieConsent>
        </AppProvider>
      </ThemeProvider>
    </IntlProvider>
  )
}

export default MyApp
