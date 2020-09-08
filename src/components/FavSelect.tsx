import React from 'react'
import { Button, Favs } from '../styles/styles'
import { FavObject } from '../actions'
interface FavSelectProps {
  favs: FavObject[]
  setFavPhotoDate(val: any): any
  setDisplayFav(val: boolean): any
  displayFav: boolean
  handleDelete(val: string): any
  favToDisplay: FavObject[]
}

const FavSelect = ({
  favs,
  setFavPhotoDate,
  setDisplayFav,
  displayFav,
  handleDelete,
  favToDisplay,
}: FavSelectProps) => {
  const handleChange = (e: any) => {
    let { value } = e.target
    setFavPhotoDate(value)
    setDisplayFav(true)
  }

  return (
    <Favs>
      {favs.length === 0 ? null : (
        <label>
          {' '}
          Favorites:
          <select onChange={handleChange} style={{ marginLeft: '10px' }}>
            <option selected value={favs[0].date}>
              Select
            </option>
            {favs.map((fav: FavObject) => (
              <option key={fav.date} value={fav.date}>
                {fav.title}
              </option>
            ))}
          </select>
        </label>
      )}
      <div style={{ marginLeft: '10px' }}>
        {displayFav ? (
          <Button onClick={() => handleDelete(favToDisplay[0].date)}>
            Delete
          </Button>
        ) : null}
      </div>
    </Favs>
  )
}

export default FavSelect
