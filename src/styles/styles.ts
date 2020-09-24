import styled from 'styled-components'

export const AppContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #292d3e;
  color: white;
  width: 100vw;
  min-height: 100vh;
  padding: 2rem;
  justify-content: center;
  align-items: center;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 3rem;
  width: 95%;
  padding: 1.5rem;
`

export const HeaderFont = styled.h1`
  font-size: 2rem;
  color: #ffa7c4;
`

export const FrameContainer = styled.div`
  display: flex;
  height: 40%;
  width: 95%;
  padding: 2rem;
  justify-content: center;
  align-items: center;
`

export const InnerFrameContainer = styled.div`
  display: flex;
  height: 100%;
  width: 50%;
  margin: 2rem;
  justify-content: center;
  border: 0.2rem solid gray;
`

export const FrameSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  height: 20rem;
  width: 50%;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  display: flex;
`

export const ContentContainer = styled.div`
  display: flex;
  minimum-height: 5rem;
  width: 50%;
  justify-content: center;
`

export const GrayButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  minimum-height: 2rem;
  width: 50%;
  padding: 1.5rem;
`

export const Favs = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`
