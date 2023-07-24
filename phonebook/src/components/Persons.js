const Persons = ({ personsToShow, deleteContact }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person
          key={person.id}
          person={person}
          delContact={() => deleteContact(person.id)}
        />
      )}
    </div>
  )
}

const Person = ({ person, delContact }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={delContact}>delete</button>
    </div>
  )
}

export default Persons