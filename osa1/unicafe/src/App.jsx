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

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props  
  const all = good + neutral + bad 
  const average = all > 0 ? (good - bad) / all : 0
  const positive = all > 0 ? (good / all)*100 : 0 
  
  if (all == 0) {
    return(
    <div>
      <h1>statistics</h1>
      <p>No feeback given</p>
    </div>
    )
  }

  return(
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={all} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="positive" value ={`${positive}%`} />
        </tbody>
      </table>
    </div>
  )
}
  

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const setTo = (value) => {
    switch (value) {
      case 'good':
        setGood(good + 1)
        break

      case 'neutral':
        setNeutral(neutral + 1)
        break

      case 'bad':
        setBad(bad + 1)
        break
    }
  }

  return (
    <div>
      <Header/>
      <Button handleClick={() => setTo('good')} text="good" />
      <Button handleClick={() => setTo('neutral')} text="neutral" />
      <Button handleClick={() => setTo('bad')} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
