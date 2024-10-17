import React from 'react'

function SearchInput({handleSearchItem}) {
  return (
    <div className="w-max flex m-auto">
    <input
      type="input"
      placeholder="Szukaj..."
      className="px-2 py-2 border-2 shadow-md w-96"
      onChange={(e) => handleSearchItem(e)}
    ></input>
  </div>
  )
}

export default SearchInput