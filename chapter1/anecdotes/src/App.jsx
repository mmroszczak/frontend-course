import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  const [points, setPoints] = useState(new Uint8Array(8))
  const [selected, setSelected] = useState(0)

  const handleClick = () => {

    const randNum = Math.floor(Math.random() * 8)
    console.log(randNum)
    setSelected(randNum)
  }

  const handleVote = () => {
    let newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}
      <p>This anecdote has {points[selected]} upvotes</p>
      <p>
      <button onClick={handleClick}>next anecdote</button>
      <button onClick={handleVote}>vote up</button>
      </p>
      <h1>Anecdote with most votes</h1>
      {anecdotes[points.indexOf(Math.max(...points))]}
      <p>This anecdote has {Math.max(...points)} upvotes</p>
    </div>
  )
}

export default App