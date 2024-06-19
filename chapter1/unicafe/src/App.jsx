import { useState } from 'react'

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
      <button onClick = {handleGood}>good</button>
      <button onClick = {handleNeutral}>neutral</button>
      <button onClick = {handleBad}>bad</button>
      <br/>
      <h1>statistics</h1>
      <p>
        good {good}<br/>
        neutral {neutral}<br/>
        bad {bad}<br/>
        console.log({good-bad})
        average {(good - bad) / (good + bad + neutral)}
        positive {100 * good / (good + bad + neutral)} %
      </p>

    </div>
  )
}

export default App