

export function LessonList({ lesson }) {
  return <>
        <ul className="">
            <h2><b>Title:</b> {lesson.title}</h2>
            <h2><b>Status:</b> {lesson.status}</h2>
            <h2><b>Publish Date:</b> {lesson.publish_date}</h2>
        </ul>
          </>;
}
  