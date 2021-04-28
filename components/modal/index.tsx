import { useState, useEffect } from 'react'
import { Container, Content } from './styles'

interface ModalProps {
  close(): void
}

const Modal: React.FC<ModalProps> = ({ children, close }) => {
  const [modal, setModal] = useState<HTMLElement>()

  useEffect(() => {
    return setModal(document.getElementById('myModal'))
  }, [])

  window.onclick = function (event) {
    if (event.target === modal) {
      close()
    }
  }

  return (
    <Container id="myModal">
      <Content>{children}</Content>
    </Container>
  )
}

export default Modal
