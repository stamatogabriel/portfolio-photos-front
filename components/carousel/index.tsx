import 'keen-slider/keen-slider.min.css'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useKeenSlider } from 'keen-slider/react'

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

import { Container, ImageWrapper, Dot, Dots, StringWrapper } from './styles'

interface CarouselProps {
  data: any[]
  isImages: boolean
}

const Carousel: React.FC<CarouselProps> = ({ data, isImages }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(
    Math.floor(
      typeof window !== 'undefined' ? Math.floor(window.innerWidth / (isImages ? 320 : 100)) : 1
    )
  )

  const router = useRouter()
  const { locale } = router
  const [pause, setPause] = useState(false)
  const timer = useRef<any>()
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView,
    mode: 'free',
    spacing: isImages ? 5 : 1,
    centered: true,
    duration: 1000,
    loop: true,
    initial: 0,
    dragStart: () => {
      setPause(true)
    },
    dragEnd: () => {
      setPause(false)
    },
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })

  if (typeof window !== 'undefined')
    window.onresize = function () {
      setSlidesPerView(Math.floor(window.innerWidth / (isImages ? 320 : 100)))
    }

  useEffect(() => {
    sliderRef.current &&
      sliderRef.current.addEventListener('mouseover', () => {
        setPause(true)
      })
    sliderRef.current &&
      sliderRef.current.addEventListener('mouseout', () => {
        setPause(false)
      })
  }, [sliderRef])

  useEffect(() => {
    if (isImages)
      timer.current = setInterval(() => {
        if (!pause && slider) {
          slider.next()
        }
      }, 2000)
    return () => {
      clearInterval(timer.current)
    }
  }, [isImages, pause, slider])

  function ArrowLeft({ disabled, onClick }): JSX.Element {
    const disabeld = disabled ? ' arrow--disabled' : ''
    return <AiOutlineLeft className={'arrow arrow--left' + disabeld} onClick={onClick} />
  }

  function ArrowRight({ disabled, onClick }): JSX.Element {
    const disabeld = disabled ? ' arrow--disabled' : ''
    return <AiOutlineRight className={'arrow arrow--right' + disabeld} onClick={onClick} />
  }

  return (
    <Container isImages={isImages}>
      {!isImages && (
        <div ref={sliderRef} className="keen-slider">
          {data.map((item: any, idx: number) => (
            <StringWrapper key={idx} className={`keen-slider__slide number-slide${idx}`}>
              <Link href={`/galery?category=${item._id}`}>
                <a>{item?.name_english}</a>
              </Link>
            </StringWrapper>
          ))}
        </div>
      )}
      {isImages && (
        <div ref={sliderRef} className="keen-slider">
          {data.map((image: any, idx: number) => (
            <ImageWrapper key={idx} className={`keen-slider__slide number-slide`}>
              <img
                src={image?.media_url}
                alt={locale === 'en' ? image?.name_english : image?.name_portuguese}
              />
            </ImageWrapper>
          ))}
        </div>
      )}
      {slider && (
        <>
          <ArrowLeft
            onClick={(e: any) => e.stopPropagation() || slider.prev()}
            disabled={currentSlide === 0}
          />
          <ArrowRight
            onClick={(e: any) => e.stopPropagation() || slider.next()}
            disabled={currentSlide === slider.details().size - 1}
          />
        </>
      )}
      {isImages && slider && (
        <Dots>
          {data &&
            data.map((_, idx) => {
              return (
                <Dot
                  key={idx}
                  onClick={() => {
                    slider.moveToSlideRelative(idx)
                  }}
                  active={currentSlide === idx ? true : false}
                />
              )
            })}
        </Dots>
      )}
    </Container>
  )
}

export default Carousel
