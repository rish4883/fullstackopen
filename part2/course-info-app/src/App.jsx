import Course from './components/Course'
import courses from './data'

const App = () => {
  return (
    <>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </>
  )
}

const Courses = ({courses}) => {
  return (
    <>
      {courses.map((course) => {
        return <Course key={course.id} course={course}/>
      })}
    </>
  )
}

export default App