const Parts = ({ parts }) => {
    return parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
  }
  
  const ExerciseTotal = ( { parts } ) => {
    console.log(parts)
    const initialValue = {exercises: 0}
    const exerciseSum = parts.reduce(
      (a, part) => ({exercises: a.exercises + part.exercises}),
      initialValue,
    )
    
    return (
      <>
        <p><b>total of {exerciseSum.exercises} exercises</b></p>
      </>
    )
  }
  
  const Course = ({ course }) => {
    return(
      <>
      <h1>{course.name}</h1>
      <Parts parts={course.parts}/>
      <ExerciseTotal parts={course.parts} />
      </>
  
  )}

  export default Course