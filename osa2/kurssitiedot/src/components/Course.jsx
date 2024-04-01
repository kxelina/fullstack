const Course =  () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const Total = ({ parts }) => {
    const total = parts.reduce( (sum, part) => {
    return sum + part.exercises } ,0)
    return <b>total of {total} exercises</b>
  }

  const Header = ({ course }) => {
    return <h2>{course.name}</h2>
  }

  const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
    )
  }

  const Content = ({ parts }) => {
  console.log('hello',parts)
  return (
    <div>
      {parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
    </div>
    )
  }    
  
  return (
      <div>
      {courses.map(course => (
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
      </div>
    )
  }

export default Course