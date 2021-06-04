import { useRouter } from 'next/router'
import { Container } from '../components/styles/container'
import PortuguesePrivacy from '../components/privacy_policy/portuguese'
import EnglishPrivacy from '../components/privacy_policy/english'

const PrivacyPolicy: React.FC = () => {
  const router = useRouter()
  const { locale } = router
  return <Container>{locale === 'en' ? <EnglishPrivacy /> : <PortuguesePrivacy />}</Container>
}

export default PrivacyPolicy
