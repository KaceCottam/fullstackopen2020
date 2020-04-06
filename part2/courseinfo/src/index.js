import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = (props) => {
  const parts = props.parts.map(x=>(<Part part={x} />))

  return (
    <div>
      {parts}
    </div>
  )
}

const Course = ({course}) => (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
    </div>
)

// const Total = (props) => {
//   const exerciseSum = props.parts.map(x=>x.exercises).reduce((x,y)=>x+y)
//   return (
//     <p>Number of exercises {exerciseSum}</p>
//   )
// }

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <Course course={course} />
  )
}

ReactDOM.render(<App />,document.getElementById("root"))
