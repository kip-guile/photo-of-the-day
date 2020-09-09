import React from 'react'
import * as rtl from '@testing-library/react'
import axios from 'axios'
import { fetchPhotoObject } from '../../actions/photos'

// My attempt at testing that the photo persists in localStorage
// I attempted to mock axios and localStorage
// Since the photo is stored in localStorage after every successful request to
// the NASA API, I attempted test the action that makes the request
jest.mock('axios', () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        copyright: 'Raul Villaverde Fraile',
        date: '2020-09-09',
        explanation:
          "Have you ever seen the Pleiades star cluster? Even if you have, you probably have never seen it as large and clear as this. Perhaps the most famous star cluster on the sky, the bright stars of the Pleiades can be seen without binoculars from even the depths of a light-polluted city.  With a long exposure from a dark location, though, the dust cloud surrounding the Pleiades star cluster becomes very evident. The featured exposure covers a sky area several times the size of the full moon.  Also known as the Seven Sisters and M45, the Pleiades lies about 400 light years away toward the constellation of the Bull (Taurus).  A common legend with a modern twist is that one of the brighter stars faded since the cluster was named, leaving only six of the sister stars visible to the unaided eye. The actual number of Pleiades stars visible, however, may be more or less than seven, depending on the darkness of the surrounding sky and the clarity of the observer's eyesight.   Teachers & Students: Ideas for utilizing APOD in the classroom.",
        hdurl: 'https://apod.nasa.gov/apod/image/2009/Pleiades_Fraile_3413.jpg',
        media_type: 'image',
        service_version: 'v1',
        title: 'Pleiades: The Seven Sisters Star Cluster',
        url: 'https://apod.nasa.gov/apod/image/2009/Pleiades_Fraile_960.jpg',
      })
    ),
  }
})

const storage = {}

window.localStorage = {
  setItem: jest.fn((key, value) => (storage[key] = JSON.stringify(value))),
  getItem: jest.fn((key) => (Object.hasOwnProperty(key) ? storage[key] : null)),
}

test('Stores data in local storage after successful api request', async () => {
  expect(storage).toEqual({})
  return fetchPhotoObject('2020-09-09')(() => {}).then(() => {
    expect(storage).toEqual({
      copyright: 'Raul Villaverde Fraile',
      date: '2020-09-09',
      explanation:
        "Have you ever seen the Pleiades star cluster? Even if you have, you probably have never seen it as large and clear as this. Perhaps the most famous star cluster on the sky, the bright stars of the Pleiades can be seen without binoculars from even the depths of a light-polluted city.  With a long exposure from a dark location, though, the dust cloud surrounding the Pleiades star cluster becomes very evident. The featured exposure covers a sky area several times the size of the full moon.  Also known as the Seven Sisters and M45, the Pleiades lies about 400 light years away toward the constellation of the Bull (Taurus).  A common legend with a modern twist is that one of the brighter stars faded since the cluster was named, leaving only six of the sister stars visible to the unaided eye. The actual number of Pleiades stars visible, however, may be more or less than seven, depending on the darkness of the surrounding sky and the clarity of the observer's eyesight.   Teachers & Students: Ideas for utilizing APOD in the classroom.",
      hdurl: 'https://apod.nasa.gov/apod/image/2009/Pleiades_Fraile_3413.jpg',
      media_type: 'image',
      service_version: 'v1',
      title: 'Pleiades: The Seven Sisters Star Cluster',
      url: 'https://apod.nasa.gov/apod/image/2009/Pleiades_Fraile_960.jpg',
    })
  })
})
