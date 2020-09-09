import React from 'react'
import { Image, Button } from 'antd'
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons'
import {
  FrameContainer,
  InnerFrameContainer,
  FrameSkeleton,
} from '../styles/styles'
import { PreviewObj } from '../actions'

// Describe props for Frame component
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
  // controller to handle (next/previous) button clicks.
  const handleClick = (val: number) => {
    change(val)
    setDisplayFav(false)
  }

  // helper to get last three characters of url. Used to check if url is a photo or video.
  const getLast3 = (url: string) => {
    if (url.substr(url.length - 3) === 'jpg') return true
    return false
  }

  return (
    <FrameContainer>
      <div style={{ marginRight: '15px' }}>
        {getLast3(previews.previous) ? (
          <Image width={100} src={previews.previous} alt='photo-of-the-day' />
        ) : (
          <iframe
            style={{ width: '100px' }}
            src={previews.previous}
            title='previous'
          />
        )}
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
        {getLast3(previews.next) ? (
          <Image width={100} src={previews.next} alt='photo-of-the-day' />
        ) : (
          <iframe style={{ width: '100px' }} src={previews.next} title='next' />
        )}
      </div>
    </FrameContainer>
  )
}

export default Frame
