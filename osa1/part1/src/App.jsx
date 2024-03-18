const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {part1: 'Fundamentals of React'},
    {part2: 'Using props to pass data'},
    {part3: 'State of a component'}
  ]
  const exercises = [
    {exercises1 : 10},
    {exercises2 : 7},
    {exercises3 : 14}
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}  exercises={exercises}/>
      <Total exercises={exercises} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.parts[0].part1} {props.exercises[0].exercises1}</p>
      <p>{props.parts[1].part2} {props.exercises[1].exercises2}</p>
      <p>{props.parts[2].part3} {props.exercises[2].exercises3}</p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  const total = props.exercises[0].exercises1 + 
  props.exercises[1].exercises2 + 
  props.exercises[2].exercises3;
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}


export default App
