const Total = (props) => {
  return <p>Number of exercises {props.sumOfExercises}</p>
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  const Course =  () => {
    return (
      <div>
      <Header course={course} />
      <Content course={course} />
      </div>
    )
  }

  const Header = () => {
    return <h1>{course.name}</h1>
  }
  
  const Content = () => {
  const parts = course.parts
  console.log(parts)
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

  return (
    <div>
      <Course course={course} />
    </div>
  )
}


export default App