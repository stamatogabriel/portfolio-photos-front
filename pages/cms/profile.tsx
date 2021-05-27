import { useCallback, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'

import { useToast } from '../../hooks/toast'

import Input from '../../components/input'
import Button from '../../components/button'

import getValidationErrors from '../../utils/getValidationErrors'

import api from '../../services/api'

import Sidebar from '../../components/sidebar'

import { Container } from '../../components/styles/container'

import styled from 'styled-components'
import { useAuth } from '../../hooks/auth_context'

export const Wrapper = styled.div`
  display: flex;
`

const CustomContainer = styled(Container)`
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  form {
    width: 50%;

    h2 {
      text-align: center;
    }
  }
`

interface UserFormData {
  _id?: string
  name: string
  email: string
}

interface UserPassFormData {
  password: string
  confirm_password: string
}

function Dashboard(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingPass, setLoadingPass] = useState<boolean>(false)
  const formRef = useRef<FormHandles>(null)
  const passRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const { user, setUser } = useAuth()

  const updateUser = useCallback(
    async (data: UserFormData) => {
      setLoading(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string(),
          email: Yup.string(),
        })

        await schema.validate(data, { abortEarly: false })

        const response = await api.put(`/users/${user?._id}`, data)

        setUser(response.data)

        setLoading(false)

        addToast({
          type: 'success',
          title: 'Cadastro atualizado com sucesso',
        })
      } catch (err) {
        setLoading(false)
        if (err.inner) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização do cadastro',
          description:
            'Ocorreu um erro ao atualizar o cadastro, por favor, tente de novo mais tarde',
        })
      }
    },
    [addToast, setUser, user]
  )

  const updatePass = useCallback(
    async (data: UserPassFormData) => {
      setLoadingPass(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'Senha deve conter pelo menos seis caracteres'),
          confirm_password: Yup.string().min(6, 'Senha deve conter pelo menos seis caracteres'),
        })

        if (data.password !== data.confirm_password) {
          setLoadingPass(false)
          return addToast({
            type: 'error',
            title: 'Senhas não conferem',
            description: 'As senhas digitadas não conferem, por favor, tente novamente.',
          })
        }

        await schema.validate(data, { abortEarly: false })

        await api.put(`/users/${user?._id}/pass`, data)

        setLoadingPass(false)

        addToast({
          type: 'success',
          title: 'Senha atualizada com sucesso',
        })
      } catch (err) {
        setLoadingPass(false)
        if (err.inner) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização do cadastro',
          description: 'Ocorreu um erro ao atualizar a senha, por favor, tente de novo mais tarde',
        })
      }
    },
    [addToast, user?._id]
  )

  return (
    <Wrapper>
      <Sidebar />
      <CustomContainer>
        <Form ref={formRef} onSubmit={updateUser} initialData={user}>
          <h2>Edição de Cadastro</h2>
          <Input name="name" icon={FiUser} placeholder="Nome completo" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Editar'}
          </Button>
        </Form>
        <Form ref={passRef} onSubmit={updatePass} initialData={user}>
          <h2>Alterar a senha</h2>
          <Input name="password" type="password" icon={FiLock} placeholder="Digite sua senha" />
          <Input
            name="confirm_password"
            type="password"
            icon={FiLock}
            placeholder="Confirme sua senha"
          />
          <Button type="submit" disabled={loadingPass}>
            {loadingPass ? 'Carregando...' : 'Editar'}
          </Button>
        </Form>
      </CustomContainer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies['@Portfolio_access_token']?.toString()

  if (!token) {
    return {
      redirect: {
        destination: '/cms/login',
        permanent: false,
      },
    }
  }

  return { props: { message: 'ok' } }
}

export default Dashboard
