import { useCallback, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FiArrowLeft, FiArrowRight, FiEye } from 'react-icons/fi'

import Sidebar from '../../components/sidebar'
import Modal from '../../components/modal'

import api from '../../services/api'

import styled from 'styled-components'
import { lighten } from 'polished'

import { Container } from '../../components/styles/container'
import { Table } from '../../components/styles/table'
import Message from '../../components/message'

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
  leads: any
  total_pages: number
  page: number
}

const Leads: React.FC<IMedias> = ({ leads, total_pages, page }) => {
  const [openModal, setOpenModal] = useState(false)
  const [message, setMessage] = useState<any>({})
  const router = useRouter()

  const handleOpenModal = useCallback((item) => {
    setMessage(item)
    setOpenModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setMessage({})
    setOpenModal(false)
  }, [])

  return (
    <div>
      <Wrapper>
        <Sidebar selected="leads" />
        <CustomContainer>
          {leads.length ? (
            <>
              <CustomTable>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Motivo</th>
                    <th style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      Ver mensagem
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((item) => (
                    <tr key={item?.id}>
                      <td>{item?.name}</td>
                      <td>{item?.email}</td>
                      <td>{item?.motive}</td>
                      <td
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <FiEye size={20} onClick={() => handleOpenModal(item)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </CustomTable>
              <Pagination>
                <button
                  onClick={() => router.push(`/cms/leads?page=${Number(page) - 1}`)}
                  disabled={Number(page) === 1 || total_pages === 1}
                >
                  <FiArrowLeft style={{ marginRight: '10px' }} />
                  Anterior
                </button>
                <button
                  disabled={Number(page) >= total_pages}
                  onClick={() => router.push(`/cms/leads?page=${Number(page) + 1}`)}
                >
                  Proximo
                  <FiArrowRight style={{ marginLeft: '10px' }} />
                </button>
              </Pagination>
            </>
          ) : (
            <h1>Não existem leads para exibir</h1>
          )}
        </CustomContainer>
        <Modal open={openModal} close={handleCloseModal}>
          <Message close={handleCloseModal} message={message} />
        </Modal>
      </Wrapper>
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

  const response = await api.get(`/leads?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const { leads, total_pages } = response.data

  return {
    props: {
      leads,
      total_pages,
      page,
    },
  }
}

export default Leads
