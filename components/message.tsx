import React from 'react'
import { FiX } from 'react-icons/fi'

import { Container } from './styles/form_styles'

interface PropsMessge {
  close(): void
  message?: IMessage
}

interface IMessage {
  name: string
  email: string
  motive: string
  message: string
}

const Message: React.FC<PropsMessge> = ({ close, message }) => {
  return (
    <Container>
      <FiX size={25} onClick={close} />
      <div>
        <h2>{message?.motive}</h2>
        <strong>{message?.name}</strong>
        <p>
          <strong>Email: </strong>
          {message?.email}
        </p>
        <p>
          <strong>Mensagem: </strong>
          {message?.message}
        </p>
      </div>
    </Container>
  )
}

export default Message
