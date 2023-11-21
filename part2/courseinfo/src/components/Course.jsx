const Header = ( {name} ) => {
  return <h2>{name}</h2>; 
};

//used in Content
const Part = ( {name, exercises} ) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ( {parts} ) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ( {parts} ) => {
  const total = parts.reduce((sum, currentPart) => sum + currentPart.exercises, 0);

  console.log("total", total);

  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  );
};

const Course = ( {course} ) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};
export default Course;