import { useState, useEffect } from 'react'
import { Container, Content } from './styles'

interface ModalProps {
  close(): void
  open: boolean
}

const Modal: React.FC<ModalProps> = ({ children, close, open }) => {
  const [modal, setModal] = useState<HTMLElement>()

  useEffect(() => {
    return setModal(document.getElementById('myModal'))
  }, [])

  if (process.browser) {
    window.onclick = function (event) {
      if (event.target === modal) {
        close()
      }
    }
  }

  return (
    <Container id="myModal" open={open}>
      <Content>{children}</Content>
    </Container>
  )
}

export default Modal
