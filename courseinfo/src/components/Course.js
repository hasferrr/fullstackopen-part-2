const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((acc, e) => e.exercises + acc, 0)} />
    </div>
  )
}

const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

export default Course