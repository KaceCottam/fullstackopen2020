import React from 'react'

const Header = ({ name }) => (
  <h2>{name}</h2>
)

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({ parts }) => {
  const course_parts = parts.map((x, i)=>(<Part key={i} name={x.name} exercises={x.exercises} />))

  return (
    <div>
      {course_parts}
    </div>
  )
}

const Total = ({ parts }) => {
  const exerciseSum = parts.map(x=>x.exercises).reduce((x,y)=>x+y)
  return (
    <b>total of {exerciseSum} exercises</b>
  )
}

const Course = ({ course }) => (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
)

export default Course
