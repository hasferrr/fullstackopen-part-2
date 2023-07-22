const PersonForm = ({ addContact, newName, newNumber, onInputName, onInputNumber }) => {
  return (
    <form onSubmit={addContact}>
      <div>
        name:
        <input
          value={newName}
          onChange={onInputName}
        />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={onInputNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm