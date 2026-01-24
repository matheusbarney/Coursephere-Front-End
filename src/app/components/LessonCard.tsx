
import { LessonList } from '../atoms/LessonList';
import { StandardHeader } from '../atoms/StandardHeader';
import { LoadingText } from '../atoms/LoadingText';

export function LessonCard({
  lesson
}) {
  return <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
        <StandardHeader text={`Lesson Details`} />
        <br></br>
        {lesson ? <LessonList lesson={lesson} /> : <LoadingText     />}
      </div>;
}
  