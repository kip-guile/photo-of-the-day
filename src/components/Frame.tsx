import React from 'react'
import {
  FrameContainer,
  Image,
  InnerFrameContainer,
  Button,
  FrameSkeleton,
} from '../styles/styles'

interface FrameProps {
  imgurl: string
  change(by: number): any
  setDisplayFav(val: boolean): any
  mediaType: string
  disableNext: boolean
}

const Frame = ({
  imgurl,
  change,
  setDisplayFav,
  mediaType,
  disableNext,
}: FrameProps) => {
  const handleClick = (val: number) => {
    change(val)
    setDisplayFav(false)
  }
  return (
    <FrameContainer>
      <Button onClick={() => handleClick(-1)}>prev day</Button>
      {mediaType === 'video' ? (
        <FrameSkeleton>
          <h1>No img available</h1>
        </FrameSkeleton>
      ) : (
        <InnerFrameContainer>
          <Image src={imgurl} alt='photo-of-the-day' />
        </InnerFrameContainer>
      )}
      <Button disabled={disableNext} onClick={() => handleClick(1)}>
        next day
      </Button>
    </FrameContainer>
  )
}

export default Frame
