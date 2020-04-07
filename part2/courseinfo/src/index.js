import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({name}) => (
  <h2>{name}</h2>
)

const Part = ({name, exercises}) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({parts}) => {
  const course_parts = parts.map(x=>(<Part name={x.name} exercises={x.exercises} />))

  return (
    <div>
      {course_parts}
    </div>
  )
}

const Course = ({course}) => (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
)

const Total = ({parts}) => {
  const exerciseSum = parts.map(x=>x.exercises).reduce((x,y)=>x+y)
  return (
    <b>total of {exerciseSum} exercises</b>
  )
}

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const course_html = courses.map(c=>(<Course course={c} />))
  return (
    <div>
      <h1>Web development curriculum</h1>
      {course_html}
    </div>
  )
}

ReactDOM.render(<App />,document.getElementById("root"))
