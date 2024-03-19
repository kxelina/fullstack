import { useState } from 'react'

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Title = (props) => {
  console.log(props)
  return (
    <div>
      <h1>statistics</h1>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const SetToGood = () => {
    setGood(good + 1)
  }

  const SetToNeutral = () => {
    setNeutral(neutral + 1)
  }

  const SetToBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header/>
      <Button handleClick={() => SetToGood()} text="good" />
      <Button handleClick={() => SetToNeutral()} text="neutral" />
      <Button handleClick={() => SetToBad()} text="bad" />
      <Title/>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App
