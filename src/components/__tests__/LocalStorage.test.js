import React from 'react'
import * as rtl from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from '../../components/Header'
import Content from '../../components/Content'

describe('should save and get data from localstorage', () => {
  const storage = {
    getItem(key) {
      return localStorage.getItem(key)
    },
    setItem(key, value) {
      localStorage.setItem(key, value)
    },
  }
  storage.setItem('photo', {
    explanation:
      "The Cat's Eye Nebula (NGC 6543) is one of the best known planetary nebulae in the sky. Its haunting symmetries are seen in the very central region of this stunning false-color picture, processed to reveal the enormous but extremely faint halo of gaseous material, over three light-years across, which surrounds the brighter, familiar planetary nebula. Made with data from the Nordic Optical Telescope in the Canary Islands, the composite picture shows extended emission from the nebula. Planetary nebulae have long been appreciated as a final phase in the life of a Sun-like star. Only much more recently however, have some planetaries been found to have halos like this one, likely formed of material shrugged off during earlier active episodes in the star's evolution. While the planetary nebula phase is thought to last for around 10,000 years, astronomers estimate the age of the outer filamentary portions of this halo to be 50,000 to 90,000 years.",
    title: "Halo of the Cat's Eye",
  })
  const object = storage.getItem('photo')
  it('header renders correctly', () => {
    expect(<Header title={object} />).toBeDefined()
  })

  it('content renders correctly', () => {
    expect(<Content explanation={object} />).toBeDefined()
  })
})
