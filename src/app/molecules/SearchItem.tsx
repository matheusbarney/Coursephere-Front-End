import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

export function SearchItem({ 
    course, lesson}
) {
  return <div className="w-75 border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 
                        bg-white hover:bg-teal-50 rounded-xl p m-4 flex flex-col items-center leading-normal shadow-lg ">
                            <Link to={`/course/${course.id}/lesson/${lesson.id}`}>
                                <p className="font-bold my-2">{lesson.title}</p>
                            </Link>
                        <ReactPlayer width="100%" height="auto" src={lesson.video_url} />
         </div>;
}
  