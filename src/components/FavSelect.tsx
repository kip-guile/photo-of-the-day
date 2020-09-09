import React from 'react'
import { Select, Button, Popconfirm } from 'antd'
import { Favs } from '../styles/styles'
import { FavObject } from '../actions'

// Describe structure of FavSelect props
interface FavSelectProps {
  favs: FavObject[]
  setFavPhotoDate(val: any): any
  setDisplayFav(val: boolean): any
  displayFav: boolean
  handleDelete(val: string): any
  favToDisplay: FavObject[]
}

const { Option } = Select

const FavSelect = ({
  favs,
  setFavPhotoDate,
  setDisplayFav,
  displayFav,
  handleDelete,
  favToDisplay,
}: FavSelectProps) => {
  // handles selection and display of favorite photos from dropdown
  const handleChange = (value: string) => {
    setFavPhotoDate(value)
    setDisplayFav(true)
  }

  return (
    <Favs>
      {favs.length === 0 ? null : (
        <label>
          {' '}
          Favorites:
          <Select
            style={{ width: 300, marginLeft: '15px' }}
            onChange={handleChange}
          >
            <Option selected value={favs[0].date}>
              select
            </Option>
            {favs.map((fav: FavObject, i: number) => (
              <Option key={i} value={fav.date}>
                {fav.title}
              </Option>
            ))}
          </Select>
        </label>
      )}
      <div style={{ marginLeft: '10px' }}>
        {displayFav ? (
          <Popconfirm
            title='This photo will be deleted'
            onConfirm={() => handleDelete(favToDisplay[0].date)}
            okText='Yes'
            cancelText='No'
          >
            <Button>Delete</Button>
          </Popconfirm>
        ) : null}
      </div>
    </Favs>
  )
}

export default FavSelect
