import React from 'react'
import * as rtl from '@testing-library/react'
import Content from '../Content'
import '@testing-library/jest-dom/extend-expect'
import { create, act } from 'react-test-renderer'

let tools

beforeEach(() => {
  rtl.cleanup()
  tools = rtl.render(<Content explanation='string' />)
})

//testing the content UI component
it('renders without crashing', () => {
  let res
  act(() => {
    res = create(<Content explanation='string' />)
  })
  expect(res.toJSON()).toMatchSnapshot()
})

it('displays content', () => {
  const content = tools.queryByText(/string/i)
  expect(content).toBeVisible()
})
