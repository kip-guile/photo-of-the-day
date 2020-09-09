import React from 'react'
import { ContentContainer } from '../styles/styles'
import { Collapse } from 'antd'

const { Panel } = Collapse

// Describe Content prop structure
interface ContentProps {
  explanation: string
}

const Content = ({ explanation }: ContentProps) => {
  return (
    <ContentContainer>
      <Collapse defaultActiveKey={['1']}>
        <Panel header='Photo Description' key='1'>
          <p>{explanation}</p>
        </Panel>
      </Collapse>
    </ContentContainer>
  )
}

export default Content
