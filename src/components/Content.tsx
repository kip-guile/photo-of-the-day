import React from 'react'
import { ContentContainer } from '../styles/styles'

interface ContentProps {
  explanation: string
}

const Content = ({ explanation }: ContentProps) => {
  return (
    <ContentContainer>
      <p>{explanation}</p>
    </ContentContainer>
  )
}

export default Content
