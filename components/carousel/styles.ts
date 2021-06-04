import styled from 'styled-components'

interface IDotProps {
  active?: boolean
}

interface IContainerProps {
  isImages?: boolean
}

export const Container = styled.div<IContainerProps>`
  position: relative;
  width: 100%;
  max-width: ${(props) => (props.isImages ? '100%' : '1200px')};
  height: ${(props) => (props.isImages ? '100%' : '30px')};

  .arrow {
    width: ${(props) => (props.isImages ? '30px' : '15px')};
    height: ${(props) => (props.isImages ? '30px' : '15px')};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    fill: #fff;
    cursor: pointer;
  }
  .arrow--left {
    left: ${(props) => (props.isImages ? '5px' : '-25px')};
  }
  .arrow--right {
    left: auto;
    right: ${(props) => (props.isImages ? '5px' : '-25px')};
  }
  .arrow--disabled {
    fill: rgba(255, 255, 255, 0.5);
  }
`

export const ImageWrapper = styled.div`
  height: 400px;
  width: 400px;
  border-radius: 7px;

  img {
    height: 400px;
    width: 400px;
    object-fit: cover;
  }
`
export const StringWrapper = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: #333;
    min-width: 100%;
    text-align: center;
  }
`

export const Dots = styled.div`
  display: flex;
  padding: 10px 0;
  justify-content: center;
`

export const Dot = styled.button<IDotProps>`
  border: none;
  width: 10px;
  height: 10px;
  background: ${(props) => (props.active ? '#000' : '#c5c5c5')};
  border-radius: 50%;
  margin: 0 5px;
  padding: 5px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`
