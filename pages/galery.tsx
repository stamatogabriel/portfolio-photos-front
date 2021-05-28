import { useState, useCallback } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi'

import api from '../services/api'

import Modal from '../components/modal'
import Carousel from '../components/carousel'
import { Container } from '../components/styles/container'
import { ImageContainer } from '../components/styles/image_container'
import { Pagination } from '../components/styles/pagination'
import { theme } from '../components/styles/theme'

const CustomContainer = styled(Container)`
  flex-direction: column;
`

const SubHeader = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  margin: 0;
  background: rgba(0, 0, 0, 0.4);

  a {
    text-align: center;
    font-size: 1rem;
    color: #fff;
  }
`

const GridWrapper = styled.div`
  width: 100%;
  max-width: 1150px;
  // display: grid;
  line-height: 0;

  -moz-column-count: 1;
  -webkit-column-count: 1;
  column-count: 1;

  -webkit-column-gap: 7px;
  -moz-column-gap: 7px;
  column-gap: 7px;

  @media (min-width: 400px) {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
  }

  @media (min-width: 1000px) {
    -moz-column-count: 3;
    -webkit-column-count: 3;
    column-count: 3;
  }

  @media (min-width: 1100px) {
    -moz-column-count: 4;
    -webkit-column-count: 4;
    column-count: 4;
  }
`
const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: auto;

  img {
    width: 100%;
    height: 100%;
  }

  .container {
    position: relative;
    max-width: 800px; /* Maximum width */
    margin: 0 auto; /* Center it */
  }

  .container .content {
    position: absolute; /* Position the background text */
    bottom: 0; /* At the bottom. Use top:0 to append it to the top */
    background: rgb(0, 0, 0); /* Fallback color */
    background: rgba(0, 0, 0, 0.5); /* Black background with 0.5 opacity */
    color: #f1f1f1; /* Grey text */
    width: 100%; /* Full width */
    padding: 20px; /* Some padding */

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin: 0;
      transition: transform 0.5s;
      background: ${theme.colors.secondary.dark};
      border-radius: 7px;
      border: none;
      color: ${theme.colors.white.secondary};

      svg {
        margin: 0 5px 0 0;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
  }
`

interface GaleryType {
  categories: any[]
  medias: any[]
  total_pages: number
  page: number
  category?: string
}

const Galery: React.FC<GaleryType> = ({ categories, total_pages, page, medias, category }) => {
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
      <SubHeader>
        <Carousel isImages={false} data={categories} />
      </SubHeader>
      <CustomContainer>
        <GridWrapper>
          {medias.map((item) => (
            <ImageContainer key={item._id} onClick={() => handleImage(item)}>
              <img src={item.media_url} alt={item.title_english} />
            </ImageContainer>
          ))}
        </GridWrapper>
        {total_pages > 1 && (
          <Pagination>
            <button
              onClick={() =>
                router.push(
                  `/galery?page=${Number(page) - 1}${category && `&category=${category}`}`
                )
              }
              disabled={Number(page) === 1 || total_pages === 1}
            >
              <FiArrowLeft style={{ marginRight: '10px' }} />
              Anterior
            </button>
            <button
              disabled={Number(page) >= total_pages}
              onClick={() =>
                router.push(
                  `/galery?page=${Number(page) + 1}${category && `&category=${category}`}`
                )
              }
            >
              Proximo
              <FiArrowRight style={{ marginLeft: '10px' }} />
            </button>
          </Pagination>
        )}
      </CustomContainer>
      <Modal close={closeModal} open={openModal} isImage={true}>
        <ModalWrapper>
          <div className="container">
            <img
              src={modalImage?.media_url}
              alt={locale === 'en' ? modalImage?.title_english : modalImage?.title_portuguese}
            />
            <div className="content">
              <h2>{locale === 'en' ? modalImage?.title_english : modalImage?.title_portuguese}</h2>
              <p>
                {locale === 'en'
                  ? modalImage?.description_english
                  : modalImage?.description_portuguese}
              </p>
              <button onClick={closeModal}>
                <FiX size={16} /> Fechar
              </button>
            </div>
          </div>
        </ModalWrapper>
      </Modal>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page || 1
  const category = query.category || null

  const response = await api.get(`/categories`)
  const responseMedias = await api.get(`/medias?page=${page}${category && `&category=${category}`}`)

  const { categories, total_pages } = response.data
  const { medias } = responseMedias.data

  return {
    props: {
      categories,
      medias,
      total_pages,
      page,
    },
  }
}

export default Galery
