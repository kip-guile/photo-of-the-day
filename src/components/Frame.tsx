import React from 'react'
import { Image, Button } from 'antd'
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons'
import {
  FrameContainer,
  InnerFrameContainer,
  FrameSkeleton,
} from '../styles/styles'
import { PreviewObj, PhotoReducerObject } from '../actions'

interface FrameProps {
  imgurl: string
  change(by: number): any
  setDisplayFav(val: boolean): any
  mediaType: string
  disableNext: boolean
  title: string
  previews: PreviewObj
  loading: any
}

const Frame = ({
  imgurl,
  change,
  setDisplayFav,
  mediaType,
  disableNext,
  title,
  previews,
  loading,
}: FrameProps) => {
  const handleClick = (val: number) => {
    change(val)
    setDisplayFav(false)
  }
  return (
    <FrameContainer>
      <div style={{ marginRight: '15px' }}>
        <Image width={100} src={previews.previous} alt='photo-of-the-day' />
      </div>

      <Button
        loading={loading}
        type='primary'
        icon={<StepBackwardOutlined />}
        onClick={() => handleClick(-1)}
      ></Button>
      {mediaType === 'video' ? (
        <FrameSkeleton>
          <iframe src={imgurl} title={title}></iframe>
        </FrameSkeleton>
      ) : (
        <InnerFrameContainer>
          <Image width={500} src={imgurl} alt='photo-of-the-day' />
        </InnerFrameContainer>
      )}
      <Button
        loading={loading}
        type='primary'
        icon={<StepForwardOutlined />}
        disabled={disableNext}
        onClick={() => handleClick(1)}
      ></Button>
      <div style={{ marginLeft: '15px' }}>
        <Image width={100} src={previews.next} alt='photo-of-the-day' />
      </div>
    </FrameContainer>
  )
}

export default Frame
