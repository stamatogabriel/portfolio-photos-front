import { useState, useCallback, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FiTrash, FiArrowLeft, FiArrowRight, FiPlus } from 'react-icons/fi'
import { BiPencil } from 'react-icons/bi'
import { VscLoading } from 'react-icons/vsc'

import Sidebar from '../../components/sidebar'
import FloatButton from '../../components/float_button'
import Modal from '../../components/modal'
import MediaCreate from '../../components/new_medias'

import headers from '../../utils/headers'
import api from '../../services/api'

import { useAuth } from '../../hooks/auth_context'

import styled from 'styled-components'
import { lighten } from 'polished'

import { Container } from '../../components/styles/container'
import { Table } from '../../components/styles/table'

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

export const CustomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`

export const SpinWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

// export const CustomButton = styled(Button)`
//   margin: 0 0 20px auto;
//   width: 30%;
// `

export const CustomTable = styled(Table)`
  svg {
    transition: color 0.5s;
    z-index: 3;
    cursor: pointer;
    &:hover {
      color: #e01200;
    }
  }
`

export const Pagination = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    margin: 0 15px;
    border: 1px solid #222;
    background: transparent;
    border-radius: 50px;
    cursor: pointer;
    color: #222;
    font-size: 15px;
    line-height: 24px;
    transition: font-weight 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    &:hover {
      font-weight: 700;
    }
    &:disabled {
      cursor: not-allowed;
      color: ${lighten(0.2, '#222')};
      border-color: ${lighten(0.2, '#222')};
    }
  }
`

interface IMedias {
  categories: any
  medias: any
  total_pages: number
  page: number
}

const Medias: React.FC<IMedias> = ({ medias, categories, total_pages, page }) => {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [MediaUpdate, setMediaUpdate] = useState(null)
  const [itensLoading, setItensLoading] = useState([])
  const [categoriesList, setCategoriesList] = useState([])

  const { access_token } = useAuth()

  useEffect(() => {
    if (medias && medias.length > itensLoading.length) {
      const newLoading = []

      medias.map(() => {
        newLoading.push({ loading: false })
      })

      setItensLoading(newLoading)
    }
  }, [medias, itensLoading.length])

  useEffect(() => {
    if (categories.length) {
      const list = []
      categories.map((item) => {
        list.push({ label: item.name_portuguese, value: item._id })
        return setCategoriesList(list)
      })
    }
  }, [categories])

  const getMedias = useCallback(async () => {
    router.push(`/cms/medias?page=${Number(page)}`)
  }, [page, router])

  const changeCreate = useCallback(async () => {
    await getMedias()
    setMediaUpdate(null)
    setOpenModal(false)
  }, [getMedias])

  const handleDeleteMedia = useCallback(
    async (id, index) => {
      const newLoading = []

      itensLoading.map((item, idx) => {
        idx === index ? newLoading.push({ loading: true }) : newLoading.push({ loading: false })
      })

      setItensLoading(newLoading)

      await fetch(`${process.env.NEXT_PUBLIC_API}/medias/${id}`, {
        method: 'Delete',
        headers: headers(access_token),
      })

      await getMedias()
    },
    [access_token, getMedias, itensLoading]
  )

  const handleUpdateMedia = useCallback((item) => {
    setMediaUpdate(item)
    setOpenModal(true)
  }, [])

  return (
    <div>
      <Wrapper>
        <Sidebar selected="medias" />
        <CustomContainer>
          <FloatButton
            onClick={() => {
              setMediaUpdate(null)
              setOpenModal(true)
            }}
          >
            <FiPlus color="#fff" size={35} />
          </FloatButton>
          {medias.length ? (
            <>
              <CustomTable>
                <thead>
                  <tr>
                    <th>Categoria</th>
                    <th>Nome em português</th>
                    <th>Descrição em português</th>
                    <th>Nome em inglês</th>
                    <th>Descrição em inglês</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {medias.map((item, idx) => (
                    <tr key={item.id}>
                      <td>{item?.category_id?.name_portuguese}</td>
                      <td>{item?.title_portuguese}</td>
                      <td>{item?.description_portuguese}</td>
                      <td>{item?.title_english}</td>
                      <td>{item?.description_english}</td>
                      <td>
                        <BiPencil size={20} onClick={() => handleUpdateMedia(item)} />
                      </td>
                      <td>
                        {itensLoading[idx]?.loading ? (
                          <SpinWrapper>
                            <VscLoading size={20} />
                          </SpinWrapper>
                        ) : (
                          <FiTrash
                            size={20}
                            onClick={() => {
                              handleDeleteMedia(item?._id, idx)
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </CustomTable>
              <Pagination>
                <button
                  onClick={() => router.push(`/cms/medias?page=${Number(page) - 1}`)}
                  disabled={Number(page) === 1 || total_pages === 1}
                >
                  <FiArrowLeft style={{ marginRight: '10px' }} />
                  Anterior
                </button>
                <button
                  disabled={Number(page) >= total_pages}
                  onClick={() => router.push(`/cms/medias?page=${Number(page) + 1}`)}
                >
                  Proximo
                  <FiArrowRight style={{ marginLeft: '10px' }} />
                </button>
              </Pagination>
            </>
          ) : (
            <h1>Não existem mídias para exibir</h1>
          )}
        </CustomContainer>
      </Wrapper>
      {openModal && (
        <Modal close={changeCreate}>
          <MediaCreate close={changeCreate} media={MediaUpdate} categories={categoriesList} />
        </Modal>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page || 1

  const categoriesResponse = await api.get(`/categories?page=${page}`)
  const response = await api.get(`/medias?page=${page}`)

  const { medias, total_pages } = response.data
  const { categories } = categoriesResponse.data

  return {
    props: {
      medias,
      categories,
      total_pages,
      page,
    },
  }
}

export default Medias
