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
  padding: 2rem;
  justify-content: center;
`

export const Image = styled.img`
  width: 100%;
  min-height: 100%;
  object-fit: cover;
  object-position: center;
`

export const ContentContainer = styled.div`
  display: flex;
  minimum-height: 5rem;
  width: 80%;
  justify-content: center;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  minimum-height: 2rem;
  width: 50%;
  padding: 1.5rem;
`

export const Button = styled.button`
  border: none;
  cursor: pointer;
  height: 1.5rem;
  border-radius: 5px;
`
