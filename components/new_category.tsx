import React, { useRef, useCallback } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { FiX } from 'react-icons/fi'

import { useToast } from '../hooks/toast'

import Input from './input'
import Button from './button'

import getValidationErrors from '../utils/getValidationErrors'

import api from '../services/api'

import { Container } from './styles/form_styles'

interface INewCategory {
  close(): void
  category?: NewCategoryFormData
}

interface NewCategoryFormData {
  _id?: string
  name_portuguese: string
  description_portuguese: string
  name_english: string
  description_english: string
}

const NewCategory: React.FC<INewCategory> = ({ close, category }) => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const createCategory = useCallback(
    async (data: NewCategoryFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name_portuguese: Yup.string().required('Obrigatório'),
          description_portuguese: Yup.string().required('Obrigatório'),
          name_english: Yup.string().required('Obrigatório'),
          description_english: Yup.string().required('Obrigatório'),
        })

        await schema.validate(data, { abortEarly: false })

        if (category) {
          await api.put(`/categories/${category._id}`, data)
        } else {
          await api.post('/categories', data)
        }
        close()
      } catch (err) {
        if (err.inner) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }
        addToast({
          type: 'error',
          title: category ? 'Erro na edição da categoria' : 'Erro na criação da categoria',
          description: category
            ? 'Ocorreu um erro ao editar a categoria, por favor, tente de novo mais tarde'
            : 'Ocorreu um erro ao criar a categoria, por favor, tente de novo mais tarde',
        })
      }
    },
    [addToast, category, close]
  )

  return (
    <Container>
      <FiX size={25} onClick={close} />
      <Form ref={formRef} onSubmit={createCategory} initialData={category}>
        <h2>Cadastro de Categorias</h2>
        <Input name="name_portuguese" placeholder="Nome em português" />
        <Input name="description_portuguese" placeholder="Descrição em português" />
        <Input name="name_english" placeholder="Nome em inglês" />
        <Input name="description_english" placeholder="Descrição em português" />

        <Button type="submit">Cadastrar</Button>
      </Form>
    </Container>
  )
}

export default NewCategory
