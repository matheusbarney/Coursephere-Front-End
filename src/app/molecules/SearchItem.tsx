import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import{ useParams, useNavigate } from 'react-router-dom';
import { lessonService } from '../../services/lessonService';
import { useAuth } from '../../hooks/useAuth';

import useToast from '../../hooks/useToast';

export function SearchItem({ 
    course, lesson}
) {

    const navigate = useNavigate();
    const { toastInfo } = useToast();
    const { canManageLesson, canDeleteLesson } = useAuth();

    const handleDelete = async (lessonId: number) => {
    try {
        await lessonService.deleteById(lesson.id)
        toastInfo("Lesson was removed from CourseSphere.");
        window.location.reload();
    } catch (err) {
        console.error('Error in Delete:', err);
    }
    }

    return <div className="w-75 h-50 border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 
                            bg-white hover:bg-teal-50 rounded-xl p m-4 flex flex-col items-space justify-between leading-normal shadow-lg ">
                            <div className="flex justify-between">
                                {canManageLesson(lesson.id) ? (
                                    <Link to={`/course/${course.id}/lesson/${lesson.id}/edit`}>
                                        <p className="font-bold m-2 text-black-200">{lesson.title}</p>
                                    </Link>
                                ) : (
                                    <p className="font-bold m-2 text-black-200">{lesson.title}</p>
                                )}
                                { canDeleteLesson(lesson.id) && (<p className="text-red-300 w-15 flex justify-center 
                                flex-col items-center text-xl bold border-2 rounded-xl m-1.5 hover:bg-red-100"
                                onClick={() => handleDelete(lesson.id)}
                                >X</p>)}
                            </div>
                            <ReactPlayer width="100%" height="auto" src={lesson.video_url} />
            </div>;
    }
  