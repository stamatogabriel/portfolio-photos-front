import React, { useRef, useCallback } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { FiX, FiUser, FiMail, FiLock } from 'react-icons/fi'

import { useToast } from '../hooks/toast'

import Input from './input'
import Button from './button'

import getValidationErrors from '../utils/getValidationErrors'

import api from '../services/api'

import { Container } from './styles/form_styles'

interface INewUser {
  close(): void
  user?: NewUserFormData
}

interface NewUserFormData {
  _id?: string
  name: string
  email: string
  password: string
}

const NewCategory: React.FC<INewUser> = ({ close, user }) => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const createUser = useCallback(
    async (data: NewUserFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Obrigatório'),
          email: Yup.string().required('Obrigatório'),
          password: Yup.string(),
        })

        await schema.validate(data, { abortEarly: false })

        if (user) {
          await api.put(`/users/${user._id}`, data)
        } else {
          await api.post('/users', data)
        }
        close()
      } catch (err) {
        if (err.inner) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: user ? 'Erro na edição do usuário' : 'Erro na criação do usuário',
          description: user
            ? 'Ocorreu um erro ao editar o usuário, por favor, tente de novo mais tarde'
            : 'Ocorreu um erro ao criar o usuário, por favor, tente de novo mais tarde',
        })
      }
    },
    [addToast, user, close]
  )

  return (
    <Container>
      <FiX size={25} onClick={close} />
      <Form ref={formRef} onSubmit={createUser} initialData={user}>
        <h2>Cadastro de Usuários</h2>
        <Input name="name" icon={FiUser} placeholder="Nome completo" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        {!user && <Input name="password" icon={FiLock} type="password" placeholder="Senha" />}

        <Button type="submit">{user ? 'Editar' : 'Cadastrar'}</Button>
      </Form>
    </Container>
  )
}

export default NewCategory
