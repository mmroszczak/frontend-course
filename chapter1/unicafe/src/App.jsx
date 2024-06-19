import { useState } from 'react'

const Button = ({handler, text}) => <><button onClick = {handler}>{text}</button></>
const StatisticLine = ({name, value}) => <><tr><td>{name}</td><td>{value}</td></tr></>


const Statistics = ({ good, bad, neutral }) => {

  const total = good + bad + neutral

  if (total === 0) return <><p>No feedback given</p></>


  return(
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine name='good' value={good}/>
          <StatisticLine name='neutral' value={neutral}/>
          <StatisticLine name='bad' value={bad}/>
          <StatisticLine name='average' value={parseFloat((good - bad) / (total)).toFixed(2)}/>
          <StatisticLine name='positive' value={parseFloat(100 * good / (total)).toFixed(1).toString() + ' %'}/>
        </tbody>
      </table>
      
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
  }
  
  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }
  
  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <br/>
      <Button handler={handleGood} text={'good'}/>
      <Button handler={handleBad} text={'bad'}/>
      <Button handler={handleNeutral} text={'neutral'}/>
      <br/>
    <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App