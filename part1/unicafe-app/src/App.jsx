import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const all = good+bad+neutral;
  if(all > 0) {
    return (
      <table>
        <tbody>
        <StatisticLine text="good" stat={good}/>
        <StatisticLine text="neutral" stat={neutral}/>
        <StatisticLine text="bad" stat={bad}/>
        <StatisticLine text="average" stat={(good-bad)/all}/>
        <StatisticLine text="positive" stat={((good/all)*100)+' %'}/>
        </tbody>
      </table>
    );
  }
  else {
    return (
      <div>No feedback given</div>
    );
  }
}

const StatisticLine = ({text, stat}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  );
}

const Button = ({eventHandler, text}) => {
  return <button onClick={eventHandler}>{text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () => setGood(good+1);
  const handleBad = () => setBad(bad+1);
  const handleNeutral = () => setNeutral(neutral+1);


  return (
    <div>
      <h2>give feedback</h2>
      <Button eventHandler={handleGood} text="good" />
      <Button eventHandler={handleNeutral} text="neutral" />
      <Button eventHandler={handleBad} text="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App