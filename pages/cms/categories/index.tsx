import { useState, useCallback, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FiTrash, FiArrowLeft, FiArrowRight, FiPlus } from 'react-icons/fi'
import { BiPencil } from 'react-icons/bi'
import { VscLoading } from 'react-icons/vsc'

import Sidebar from '../../../components/sidebar'
import FloatButton from '../../../components/float_button'
import Modal from '../../../components/modal'
import CategoryCreate from '../../../components/new_category'

import headers from '../../../utils/headers'
import api from '../../../services/api'

import { CustomContainer, CustomTable, Pagination, Wrapper, SpinWrapper } from './styles'
import { useAuth } from '../../../hooks/auth_context'

interface ICategories {
  categories: any
  total_pages: number
  page: number
}

const Categories: React.FC<ICategories> = ({ categories, total_pages, page }) => {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [categoryUpdate, setCategoryUpdate] = useState(null)
  const [itensLoading, setItensLoading] = useState([])

  const { access_token } = useAuth()

  useEffect(() => {
    if (categories.length && categories.length > itensLoading.length) {
      const newLoading = []

      categories.map(() => {
        newLoading.push({ loading: false })
      })

      setItensLoading(newLoading)
    }
  }, [categories, itensLoading.length])

  const getcategories = useCallback(async () => {
    router.push(`/cms/categories?page=${Number(page)}`)
  }, [page, router])

  const changeCreate = useCallback(async () => {
    await getcategories()
    setCategoryUpdate(null)
    setOpenModal(false)
  }, [getcategories])

  const handleDeleteCategory = useCallback(
    async (id, index) => {
      const newLoading = []

      itensLoading.map((item, idx) => {
        idx === index ? newLoading.push({ loading: true }) : newLoading.push({ loading: false })
      })

      setItensLoading(newLoading)

      await fetch(`${process.env.NEXT_PUBLIC_API}/categories/${id}`, {
        method: 'Delete',
        headers: headers(access_token),
      })

      await getcategories()
    },
    [access_token, getcategories, itensLoading]
  )

  const handleUpdateCategory = useCallback((item) => {
    setCategoryUpdate(item)
    setOpenModal(true)
  }, [])

  return (
    <div>
      <Wrapper>
        <Sidebar selected="categories" />
        <CustomContainer>
          <FloatButton
            onClick={() => {
              setCategoryUpdate(null)
              setOpenModal(true)
            }}
          >
            <FiPlus color="#fff" size={35} />
          </FloatButton>
          {categories.length ? (
            <>
              <CustomTable>
                <thead>
                  <tr>
                    <th>Nome em português</th>
                    <th>Descrição em português</th>
                    <th>Nome em inglês</th>
                    <th>Descrição em inglês</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((item, idx) => (
                    <tr key={item.id}>
                      <td>{item?.name_portuguese}</td>
                      <td>{item?.description_portuguese}</td>
                      <td>{item?.name_english}</td>
                      <td>{item?.description_english}</td>
                      <td>
                        <BiPencil size={20} onClick={() => handleUpdateCategory(item)} />
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
                              handleDeleteCategory(item?._id, idx)
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
                  onClick={() => router.push(`/cms/categories?page=${Number(page) - 1}`)}
                  disabled={Number(page) === 1 || total_pages === 1}
                >
                  <FiArrowLeft style={{ marginRight: '10px' }} />
                  Anterior
                </button>
                <button
                  disabled={Number(page) >= total_pages}
                  onClick={() => router.push(`/cms/categories?page=${Number(page) + 1}`)}
                >
                  Proximo
                  <FiArrowRight style={{ marginLeft: '10px' }} />
                </button>
              </Pagination>
            </>
          ) : (
            <h1>Não existem categorias para exibir</h1>
          )}
        </CustomContainer>
      </Wrapper>
      {openModal && (
        <Modal close={changeCreate}>
          <CategoryCreate close={changeCreate} category={categoryUpdate} />
        </Modal>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page || 1

  const response = await api.get(`/categories?page=${page}`)

  const { categories, total_pages } = response.data

  return {
    props: {
      categories,
      total_pages,
      page,
    },
  }
}

export default Categories