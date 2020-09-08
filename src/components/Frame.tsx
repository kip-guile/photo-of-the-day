import React from 'react'
import { FrameContainer, Image, InnerFrameContainer } from '../styles/styles'

interface FrameProps {
  imgurl: string
}

const Frame = ({ imgurl }: FrameProps) => {
  return (
    <FrameContainer>
      <InnerFrameContainer>
        <Image src={imgurl} alt='photo-of-the-day' />
      </InnerFrameContainer>
    </FrameContainer>
  )
}

export default Frame
