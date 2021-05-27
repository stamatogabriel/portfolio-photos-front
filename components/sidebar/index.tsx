import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FiX, FiCamera, FiLogOut, FiUser, FiGrid } from 'react-icons/fi'

import { IoImages, IoFolderOpenOutline } from 'react-icons/io5'

import { Container, DropzoneWrapper, IconWrapper, ImageWrapper, Item, Side } from './styles'

import Modal from '../modal'

import { useDropzone } from 'react-dropzone'
import { useAuth } from '../../hooks/auth_context'

import api from '../../services/api'

interface SidebarProps {
  selected?: string
}

const Sidebar: React.FC<SidebarProps> = ({ selected }) => {
  const [openModalImage, setOpenModalImage] = useState(false)
  const { signOut, access_token, user, setUser } = useAuth()
  const router = useRouter()

  const closeModalImage = useCallback((): any => {
    setOpenModalImage(false)
  }, [])

  const logout = useCallback(() => {
    signOut()
    router.push('/cms/login')
  }, [router, signOut])

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const form = new FormData()

      form.append('file', acceptedFiles[0])

      const { data } = await api.put(`/users/${user?._id}`, form, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      setUser(data)

      setOpenModalImage(false)
    },
    [access_token, setUser, user?._id]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Side>
      <ImageWrapper onClick={() => setOpenModalImage(true)}>
        <FiCamera size={50} />
        <img
          src={user?.avatar ? user?.avatar : '/assets/sem-imagem-avatar.png'}
          alt="Imagem do usuário"
        />
      </ImageWrapper>
      <Container>
        <h3>{user?.name}</h3>
        <Link href="/cms/profile">
          <a>Editar Cadastro</a>
        </Link>
      </Container>
      <ul>
        <Item item={selected === 'dash'}>
          <FiGrid size={20} />
          <Link href="/cms">
            <a>Dashboard</a>
          </Link>
        </Item>
        <Item item={selected === 'categories'}>
          <IoFolderOpenOutline size={20} />
          <Link href="/cms/categories">
            <a>Listar Categorias</a>
          </Link>
        </Item>
        <Item item={selected === 'medias'}>
          <IoImages size={20} />
          <Link href="/cms/medias">
            <a>Listar Mídias</a>
          </Link>
        </Item>
        <Item item={selected === 'users'}>
          <FiUser size={20} />
          <Link href="/cms/users">
            <a>Listar usuários</a>
          </Link>
        </Item>
        <button onClick={logout}>
          <FiLogOut size={20} />
          Sair
        </button>
      </ul>
      <Modal close={closeModalImage} open={openModalImage}>
        <IconWrapper>
          <FiX size={25} onClick={() => setOpenModalImage(false)} />
        </IconWrapper>
        <h2>Alterar avatar</h2>
        <DropzoneWrapper {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Solte as imagens aqui ...</p>
          ) : (
            <p>Arraste as imagens aqui, ou clique para selecionar</p>
          )}
        </DropzoneWrapper>
      </Modal>
    </Side>
  )
}

export default Sidebar
