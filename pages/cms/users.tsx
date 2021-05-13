import { useState, useCallback, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FiTrash, FiPlus } from 'react-icons/fi'
import { BiPencil } from 'react-icons/bi'
import { VscLoading } from 'react-icons/vsc'

import Sidebar from '../../components/sidebar'
import FloatButton from '../../components/float_button'
import Modal from '../../components/modal'
import UserCreate from '../../components/new_user'

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

interface IUsers {
  users: any
  total_pages: number
  page: number
}

const Users: React.FC<IUsers> = ({ users }) => {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [userUpdate, setUserUpdate] = useState(null)
  const [itensLoading, setItensLoading] = useState([])

  const { user } = useAuth()

  const { access_token } = useAuth()

  useEffect(() => {
    if (users.length && users.length > itensLoading.length) {
      const newLoading = []

      users.map(() => {
        newLoading.push({ loading: false })
      })

      setItensLoading(newLoading)
    }
  }, [users, itensLoading.length])

  const getUsers = useCallback(async () => {
    router.push(`/cms/users`)
  }, [router])

  const changeCreate = useCallback(async () => {
    await getUsers()
    setUserUpdate(null)
    setOpenModal(false)
  }, [getUsers])

  const handleDeleteUser = useCallback(
    async (id, index) => {
      const newLoading = []

      itensLoading.map((item, idx) => {
        idx === index ? newLoading.push({ loading: true }) : newLoading.push({ loading: false })
      })

      setItensLoading(newLoading)

      await fetch(`${process.env.NEXT_PUBLIC_API}/users/${id}`, {
        method: 'Delete',
        headers: headers(access_token),
      })

      await getUsers()
    },
    [access_token, getUsers, itensLoading]
  )

  const handleUpdateCategory = useCallback((item) => {
    setUserUpdate(item)
    setOpenModal(true)
  }, [])

  return (
    <div>
      <Wrapper>
        <Sidebar selected="users" />
        <CustomContainer>
          <FloatButton
            onClick={() => {
              setUserUpdate(null)
              setOpenModal(true)
            }}
          >
            <FiPlus color="#fff" size={35} />
          </FloatButton>
          {!users.length ||
          users.filter((item) => item._id === user?._id).length === users.length ? (
            <h1>Não existem usuários para exibir</h1>
          ) : (
            <>
              <CustomTable>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Criado em:</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item, idx) => {
                    if (item?._id === user?._id) return

                    return (
                      <tr key={item?._id}>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>{new Date(item?.createdAt).toLocaleDateString()}</td>
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
                                handleDeleteUser(item?._id, idx)
                              }}
                            />
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </CustomTable>
            </>
          )}
        </CustomContainer>
      </Wrapper>
      <Modal close={changeCreate} open={openModal}>
        <UserCreate close={changeCreate} user={userUpdate} />
      </Modal>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const page = query.page || 1

  const token = req.cookies['@Portfolio_access_token']?.toString()

  if (!token) {
    return {
      redirect: {
        destination: '/cms/login',
        permanent: false,
      },
    }
  }

  const response = await api.get(`/users?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return {
    props: {
      users: response.data,
    },
  }
}

export default Users
