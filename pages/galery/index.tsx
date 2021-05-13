import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import api from '../../services/api'

import { Container } from '../../components/styles/container'
import { Pagination } from '../../components/styles/pagination'
import { theme } from '../../components/styles/theme'
import { lighten } from 'polished'

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

const ButtonCategory = styled.button`
  border: none;
  border-radius: 7px;
  width: 100%;
  height: 60px;
  background: ${theme.colors.secondary.dark};
  padding: 1rem;
  cursor: pointer;
  transition: background 0.5s;
  color: ${theme.colors.white.secondary};
  font-weight: 700;

  &:hover {
    background: ${lighten(0.2, theme.colors.secondary.dark)};
  }
`

interface GaleryType {
  categories: any[]
  total_pages: number
  page: number
}

const Galery: React.FC<GaleryType> = ({ categories, total_pages, page }) => {
  const router = useRouter()
  const { locale } = router

  console.log(categories, page, total_pages)

  return (
    <CustomContainer>
      <GridWrapper>
        {categories.map((item) => (
          <ButtonCategory
            key={item._id}
            onClick={() => router.push(`/galery/${item.name_english}`)}
          >
            {locale === 'en' ? item.name_english : item.name_portuguese}
          </ButtonCategory>
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

export default Galery
