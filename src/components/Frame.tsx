import React from 'react'
import {
  FrameContainer,
  Image,
  InnerFrameContainer,
  Button,
} from '../styles/styles'

interface FrameProps {
  imgurl: string
  change(by: number): any
  setDisplayFav(val: boolean): any
}

const Frame = ({ imgurl, change, setDisplayFav }: FrameProps) => {
  const handleClick = (val: number) => {
    change(val)
    setDisplayFav(false)
  }
  return (
    <FrameContainer>
      <Button onClick={() => handleClick(-1)}>prev day</Button>
      <InnerFrameContainer>
        <Image src={imgurl} alt='photo-of-the-day' />
      </InnerFrameContainer>
      <Button onClick={() => handleClick(1)}>next day</Button>
    </FrameContainer>
  )
}

export default Frame
