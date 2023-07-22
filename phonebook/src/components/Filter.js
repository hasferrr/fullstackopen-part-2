const Filter = ({ filter, onInputChange }) => {
  return (
    <div>
      filter shown with
      <input
        value={filter}
        onChange={onInputChange}
      />
    </div>
  )
}

export default Filter