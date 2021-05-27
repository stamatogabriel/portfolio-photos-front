import styled from 'styled-components'

interface ParallaxProps {
  image: string
}

export const Parallax = styled.div<ParallaxProps>`
  background-image: ${(props) => `url(${props.image})`};

  /* Set a specific height */
  min-height: calc(100vh - 95px);

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
