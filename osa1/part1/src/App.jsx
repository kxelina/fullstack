const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {name: 'Fundamentals of React', exercises: 10},
    {name: 'Using props to pass data', exercises: 7},
    {name: 'State of a component', exercises: 14}
  ]
}

  const Header = () => {
    console.log(course)
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    )
  }

  const Content = () => {
    const parts = course.parts
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
    const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
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
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
