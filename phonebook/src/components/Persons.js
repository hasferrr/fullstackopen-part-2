const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map((person) =>
        <Person key={person.id} person={person} />
      )}
    </div>
  )
}

const Person = ({ person }) => <div>{person.name} {person.number}</div>

export default Persons