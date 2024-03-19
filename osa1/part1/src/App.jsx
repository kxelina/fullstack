const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name: 'Fundamentals of React', exercises: 10},
    {name: 'Using props to pass data', exercises: 7},
    {name: 'State of a component', exercises: 14}
  ]

  const Header = () => {
    console.log(course)
    return (
      <div>
        <h1>{course}</h1>
      </div>
    )
  }

  const Content = () => {
    console.log(parts)
    return (
      <div>
      {parts.map(part =>
            <p> {part.name}  {part.exercises}</p>
          )}
      </div>
    )
  }

  const Total = () => {
    const total = parts[0].exercises + parts[1].exercises + parts[2].exercises
    console.log(total)
    return (
      <div>
        <p>Total number of exercises {total}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
