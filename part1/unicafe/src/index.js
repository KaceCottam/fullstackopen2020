import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => (<h1>give feedback</h1>)

const Button = ({text, onClick}) => (<button onClick={onClick}>{text}</button>)

const IncrementButton = ({text, state, stateFn}) => (
  <Button text={text} onClick={() => stateFn(state + 1)} />
)

const Statistics = ({good, neutral, bad}) => {
  if(good + neutral + bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  return (
    <div>
      <h1>statistics</h1>
      <tr>
        <td>good</td>
        <td>{good}</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>{neutral}</td>
      </tr>
      <tr>
        <td>bad</td>
        <td>{bad}</td>
      </tr>
      <tr>
        <td>all</td>
        <td>{all}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{average}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{positive}%</td>
      </tr>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <IncrementButton text="good" state={good} stateFn={setGood} />
      <IncrementButton text="neutral" state={neutral} stateFn={setNeutral} />
      <IncrementButton text="bad" state={bad} stateFn={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
