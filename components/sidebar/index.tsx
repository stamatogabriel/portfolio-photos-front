import { useState, useCallback } from 'react'
import Link from 'next/link'
import { FiX, FiCamera, FiLogOut, FiUsers, FiUser, FiGrid } from 'react-icons/fi'

import { IoImages, IoFolderOpenOutline } from 'react-icons/io5'

import { Container, DropzoneWrapper, IconWrapper, ImageWrapper, Item, Side } from './styles'

import Modal from '../modal'

import { useDropzone } from 'react-dropzone'

interface SidebarProps {
  selected: string
}

const Sidebar: React.FC<SidebarProps> = ({ selected }) => {
  const [openModalImage, setOpenModalImage] = useState(false)

  const closeModalImage = (): any => {
    setOpenModalImage(false)
  }

  const onDrop = useCallback(async (acceptedFiles) => {
    const form = new FormData()

    form.append('file', acceptedFiles[0])

    // const response = await api.put(`/users/${user.profile._id}/images`, form, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })

    setOpenModalImage(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Side>
      <ImageWrapper onClick={() => setOpenModalImage(true)}>
        <FiCamera size={50} />
        <img src={'/assets/user.png'} alt="Imagem do usuário" />
      </ImageWrapper>
      <Container>
        <h3>Gabriel</h3>
        <Link href="/dashboard/user">
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
        <Item item={selected === 'admin'}>
          <FiUser size={20} />
          <Link href="/dashboard/admins">
            <a>Listar administradores</a>
          </Link>
        </Item>
        <Item item={selected === 'people'}>
          <FiUsers size={20} />
          <Link href="/dashboard/people">
            <a>Listar pessoas que adotaram</a>
          </Link>
        </Item>
        <button
          onClick={() => {
            return
          }}
        >
          <FiLogOut size={20} />
          Sair
        </button>
      </ul>
      {openModalImage && (
        <Modal close={closeModalImage}>
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
      )}
    </Side>
  )
}

export default Sidebar
