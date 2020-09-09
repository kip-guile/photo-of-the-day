import React from 'react'
import { Select, Button, Popconfirm, message } from 'antd'
import { Favs } from '../styles/styles'
import { FavObject } from '../actions'
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
  const handleChange = (value: string) => {
    setFavPhotoDate(value)
    setDisplayFav(true)
  }
  function cancel(e: any) {
    console.log(e)
    message.error('Click on No')
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
            {favs.map((fav: FavObject) => (
              <Option key={fav.date} value={fav.date}>
                {fav.title}
              </Option>
            ))}
          </Select>
        </label>
      )}
      <div style={{ marginLeft: '10px' }}>
        {displayFav ? (
          <Popconfirm
            title='Are you sure delete this task?'
            onConfirm={() => handleDelete(favToDisplay[0].date)}
            onCancel={cancel}
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
