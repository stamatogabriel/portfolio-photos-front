import { useRef, useCallback, useState, useEffect } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { FiX } from 'react-icons/fi'

import { useToast } from '../../hooks/toast'

import Input from '../input'
import Select from '../select'
import Button from '../button'
import Dropzone from '../dropzone'

import getValidationErrors from '../../utils/getValidationErrors'

import api from '../../services/api'

import { Container } from '../styles/form_styles'
import { ContainerRadio } from './styles'

interface INewMedia {
  close(): void
  media?: NewMediaFormData
  categories: any[]
}

interface NewMediaFormData {
  [x: string]: string | Blob
  _id?: string
  media_id: string
  title_portuguese: string
  description_portuguese: string
  title_english: string
  description_english: string
  media_url: string
}

const NewMedia: React.FC<INewMedia> = ({ close, media, categories }) => {
  const formRef = useRef<FormHandles>(null)
  const [type, setType] = useState<string>('')

  useEffect(() => {
    if (media?.media_url.includes('s3.amazonaws')) setType('photo')
    if (media?.media_url.includes('youtube')) setType('video')
  }, [media])

  const { addToast } = useToast()

  const handleInputChange = useCallback((value: string) => {
    setType(value)
  }, [])

  const createMedia = useCallback(
    async (data: NewMediaFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          category_id: Yup.string().required('Obrigatório'),
          title_portuguese: Yup.string().required('Obrigatório'),
          description_portuguese: Yup.string().required('Obrigatório'),
          title_english: Yup.string().required('Obrigatório'),
          description_english: Yup.string().required('Obrigatório'),
        })

        console.log(data)
        await schema.validate(data, { abortEarly: false })

        const dataForm = new FormData()

        if (type === 'photo') {
          dataForm.append('category_id', data?.category_id)
          dataForm.append('title_portuguese', data?.title_portuguese)
          dataForm.append('description_portuguese', data?.description_portuguese)
          dataForm.append('title_english', data?.title_english)
          dataForm.append('description_english', data?.description_english)
          dataForm.append('file', data?.media_url[0])
        }

        if (media) {
          await api.put(`/medias/${media._id}`, type === 'photo' ? dataForm : data)
        } else {
          await api.post('/medias', type === 'photo' ? dataForm : data)
        }
        close()
      } catch (err) {
        if (err.inner) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }
        console.log(err)
        addToast({
          type: 'error',
          title: media ? 'Erro na edição da mídia' : 'Erro na criação da mídia',
          description: media
            ? 'Ocorreu um erro ao editar a mídia, por favor, tente de novo mais tarde'
            : 'Ocorreu um erro ao criar a mídia, por favor, tente de novo mais tarde',
        })
      }
    },
    [type, media, close, addToast]
  )

  return (
    <Container>
      <FiX size={25} onClick={close} />
      <h2>Cadastro de Mídias</h2>
      <ContainerRadio>
        <div>
          <label htmlFor="video">Vídeo</label>
          <input
            type="radio"
            id="video"
            name="type"
            value="video"
            onChange={() => handleInputChange('video')}
            checked={type === 'video'}
          />
        </div>
        <div>
          <label htmlFor="photo">Foto</label>
          <input
            type="radio"
            id="photo"
            name="type"
            value="photo"
            checked={type === 'photo'}
            onChange={() => handleInputChange('photo')}
          />
        </div>
      </ContainerRadio>
      <Form ref={formRef} onSubmit={createMedia} initialData={media}>
        <Select
          name="category_id"
          placeholder="Selecione uma categoria"
          options={categories}
          defaultValue=""
        />
        <Input name="title_portuguese" placeholder="Título em português" />
        <Input name="description_portuguese" placeholder="Descrição em português" />
        <Input name="title_english" placeholder="Título em inglês" />
        <Input name="description_english" placeholder="Descrição em português" />
        {media && (
          <ContainerRadio>
            <a target="__blank" href={media.media_url} style={{ fontSize: '0.8rem' }}>
              {media.media_url.split('/')}
            </a>
          </ContainerRadio>
        )}
        {type === 'photo' ? (
          <Dropzone name="media_url" />
        ) : (
          <Input name="media_url" placeholder="Link do vídeo" />
        )}
        <Button colorButton="#336455" type="submit">
          Cadastrar
        </Button>
      </Form>
    </Container>
  )
}

export default NewMedia
