import { useCallback, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi'

import api from '../../services/api'

import Modal from '../../components/modal'
import { Container } from '../../components/styles/container'
import { Pagination } from '../../components/styles/pagination'
import { ImageContainer } from '../../components/styles/image_container'
import { theme } from '../../components/styles/theme'

const CustomContainer = styled(Container)`
  flex-direction: column;
`

const GridWrapper = styled.div`
  width: 100%;
  display: grid;

  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;

  button {
    cursor: pointer;
    margin: 0 0 15px auto;
    transition: transform 0.5s;
    background: transparent;
    border: none;
    color: ${theme.colors.white.secondary};

    &:hover {
      transform: scale(1.1);
    }
  }
`

interface MediaType {
  medias: any[]
  total_pages: number
  page: number
}

const Medias: React.FC<MediaType> = ({ medias, total_pages, page }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<any | undefined>()
  const router = useRouter()
  const { locale } = router

  const handleImage = useCallback((item) => {
    setModalImage(item)
    setOpenModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setOpenModal(false)
    setTimeout(() => {
      setModalImage(undefined)
    }, 1000)
  }, [])

  return (
    <>
      <CustomContainer>
        <GridWrapper>
          {medias.map((item) => (
            <ImageContainer key={item._id} onClick={() => handleImage(item)}>
              <img src={item.media_url} alt={item.title_english} />
              <h3>{locale === 'en' ? item.title_english : item.title_portuguese}</h3>
              <div>
                <p>{locale === 'en' ? item.description_english : item.description_portuguese}</p>
              </div>
            </ImageContainer>
          ))}
        </GridWrapper>
        {total_pages > 1 && (
          <Pagination>
            <button
              onClick={() => router.push(`/galery?page=${Number(page) - 1}`)}
              disabled={Number(page) === 1 || total_pages === 1}
            >
              <FiArrowLeft style={{ marginRight: '10px' }} />
              Anterior
            </button>
            <button
              disabled={Number(page) >= total_pages}
              onClick={() => router.push(`/galery?page=${Number(page) + 1}`)}
            >
              Proximo
              <FiArrowRight style={{ marginLeft: '10px' }} />
            </button>
          </Pagination>
        )}
      </CustomContainer>
      <Modal close={closeModal} open={openModal}>
        <ModalWrapper>
          <button onClick={closeModal}>
            <FiX size={30} />
          </button>
          <img
            src={modalImage?.media_url}
            alt={locale === 'en' ? modalImage?.title_english : modalImage?.title_portuguese}
          />
          <h2>{locale === 'en' ? modalImage?.title_english : modalImage?.title_portuguese}</h2>
          <p>
            {locale === 'en' ? modalImage?.description_english : modalImage?.description_portuguese}
          </p>
        </ModalWrapper>
      </Modal>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page || 1

  const response = await api.get(`/medias?page=${page}&type=${query.type}`)

  const { medias, total_pages } = response.data

  return {
    props: {
      medias,
      total_pages,
      page,
    },
  }
}

export default Medias
