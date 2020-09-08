import React from 'react'
import { HeaderContainer, HeaderFont } from '../styles/styles'

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderFont>{title}</HeaderFont>
    </HeaderContainer>
  )
}

export default Header
