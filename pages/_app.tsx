/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { ThemeProvider } from 'styled-components'
import { IntlProvider } from 'react-intl'
import NProgress from 'nprogress'

import * as locales from '../content/locale'

import { GlobalStyle } from '../components/styles/global'
import { theme } from '../components/styles/theme'

import { AppProvider } from '../hooks'

import { Header } from '../components/header'

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
        <title>Álvar Schwarcz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Movimento Bem Maior" />
        <meta name="keywords" content="Movimento Bem Maior" />
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
        </AppProvider>
      </ThemeProvider>
    </IntlProvider>
  )
}

export default MyApp
