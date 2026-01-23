
export function CourseList({ course }) {
  return <>
        <ul className="">
            <h2><b>Name:</b> {course.name}</h2>
            <h2><b>Description:</b> {course.description}</h2>
            <h2><b>Start Date:</b> {course.start_date}</h2>
            <h2><b>End Date:</b> {course.end_date}</h2>
        </ul>
          </>;
}
  