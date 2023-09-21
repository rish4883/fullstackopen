import { useState } from 'react'

const MostVotes = ({votes, anecdotes}) => {

  const highest = Math.max(...votes)
  const highestIndex = votes.indexOf(highest);

  if(highest==0) {
    return <p>No votes yet</p>
  }
  else {
    return <p>{anecdotes[highestIndex]}</p>
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(anecdotes.map(()=>0));
  
  const handleVotes = () => {
    const copy = [...votes]
    if(copy[selected])
      copy[selected]++;
    else
      copy[selected] = 1;
    setVotes(copy);
  }

  const handleClick = () => {
    const rand = Math.floor(Math.random() * 8);
    setSelected(rand);
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>Votes: {votes[selected]}</div>
      <button onClick={handleVotes}>Vote</button>
      <button onClick={handleClick}>Next Anecdotes</button>

      <h2>Anecdote with most votes</h2>
      <MostVotes votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}


export default App