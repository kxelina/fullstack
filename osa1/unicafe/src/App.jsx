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

const Statistics = (props) => {
  const { good, neutral, bad } = props  

  const all = good + neutral + bad  
  
  if (all == 0) {
    return(
    <div>
      <h1>statistics</h1>
      <p>No feeback given</p>
    </div>
    )
  }

  const average = all > 0 ? (good - bad) / all : 0

  const positive = all > 0 ? good / all : 0
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  )
}

const App = () => {
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
