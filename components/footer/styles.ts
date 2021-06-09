import styled from 'styled-components'

export const Container = styled.footer`
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 180px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 4px 2px 2px 2px rgba(0, 0, 0, 0.3);

  a,
  p {
    font-size: 0.8rem;
    text-align: center;
  }
`

export const SocialContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  svg {
    margin: 0 15px 20px 15px;
  }
`
