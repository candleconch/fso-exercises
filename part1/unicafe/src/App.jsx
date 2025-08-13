import { useState } from 'react'
const Button = ({rating,  onClick}) => {
  return <button onClick={onClick}>{rating}</button>
}

const Statistics = ({good, neutral, bad, sum, average, positive}) => {
  if (sum === 0) {
    return <p>No feedback given</p>
  }
  return <>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {sum}</p>
    <p>average {average}</p>
    <p>positive {positive}%</p>
</>
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleClick = (rating) => {
    return () => {
      if (rating === "good") setGood(good + 1);
      else if (rating === "bad") setBad(bad + 1);
      else setNeutral(neutral + 1);
    }
  }
  const sum = good + neutral + bad;
  const average = (good - bad)/ sum;
  const positive = good / sum * 100;
  //console.log('good: ', good, 'neutral: ', neutral, 'bad: ', bad)
  return (
    <div>
      <h1>give feedback</h1>
      <Button rating={"good"}  onClick={handleClick('good')}/>
      <Button rating={"neutral"}  onClick={handleClick('neutral')}/>
      <Button rating={"bad"}  onClick={handleClick('bad')}/>
      <h2>statistics</h2>
      <br/>
      <Statistics good={good} neutral={neutral} bad={bad} sum={sum} average={average} positive={positive}/>
    </div>
  )
}

export default App