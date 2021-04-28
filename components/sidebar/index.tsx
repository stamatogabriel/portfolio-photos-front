import { useState, useCallback } from 'react'
import Link from 'next/link'
import { FiX, FiCamera, FiLogOut } from 'react-icons/fi'

import { Container, DropzoneWrapper, IconWrapper, ImageWrapper, Item, Side } from './styles'

import Modal from '../modal'

import { useDropzone } from 'react-dropzone'

import { FiUsers, FiUser, FiGithub, FiShoppingCart, FiGrid } from 'react-icons/fi'

function Sidebar({ selected }): JSX.Element {
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
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </Item>
        <Item item={selected === 'pets'}>
          <FiGithub size={20} />
          <Link href="/dashboard/pets">
            <a>Listar Pets</a>
          </Link>
        </Item>
        <Item item={selected === 'items'}>
          <FiShoppingCart size={20} />
          <Link href="/dashboard/items">
            <a>Listar ítens do brechó</a>
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
