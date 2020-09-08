import React from 'react'
import { FrameContainer, Image, InnerFrameContainer } from '../styles/styles'

interface FrameProps {
  imgurl: string
  change(by: number): any
}

const Frame = ({ imgurl, change }: FrameProps) => {
  return (
    <FrameContainer>
      <button onClick={() => change(-1)}>prev</button>
      <InnerFrameContainer>
        <Image src={imgurl} alt='photo-of-the-day' />
      </InnerFrameContainer>
      <button onClick={() => change(1)}>next</button>
    </FrameContainer>
  )
}

export default Frame
