
const Header = (props) => {
  return <h1>{props.course}</h1>
}
const Part = (props) => {
  return <p>{props.part.name} {props.part.exercises}</p>
}
const Content = ({parts}) => {

    return (
    <>
    {parts.map((part,index) => <Part key={part.id} part={parts[index]}/>)}
   </>);
}

const Total = ({parts}) => {
  return(
      <p>
        <b>total of {parts.reduce((acc,val) => acc + val.exercises, 0)} exercises </b>
      </p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course;