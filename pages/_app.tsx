import App from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { ThemeProvider } from 'styled-components'
import NProgress from 'nprogress'

import { GlobalStyle } from '../components/styles/global'
import { theme } from '../components/styles/theme'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Movimento Bem Maior</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="Movimento Bem Maior" />
          <meta name="keywords" content="Movimento Bem Maior" />
          <meta name="og:image" content="/assets/Logo.png" />
          <meta charSet="UTF-8" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" type="text/css" href="/styles/nprogress.css" />
        </Head>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
}

export default MyApp
