import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'

const Home: React.FC = () => {
  const { formatMessage } = useIntl()
  const t = (id: string): string => formatMessage({ id })
  const router = useRouter()
  const { locale, locales, defaultLocale } = router

  return (
    <div>
      <h1>{t('hello')}</h1>
      <p>{t('welcomeMessage')}</p>
      <br />
      <p>Current locale: {locale}</p>
      <p>Default locale: {defaultLocale}</p>
      <p>Configured locales: {JSON.stringify(locales)}</p>
    </div>
  )
}

export default Home
