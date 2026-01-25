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
    const { canManageLesson, canDeleteLesson, canManageCourse } = useAuth();
    const thumbnail = getYouTubeThumbnail(lesson.video_url)

    const handleDelete = async (lessonId: number) => {
    try {
        await lessonService.deleteById(lesson.id)
        toastInfo("Lesson was removed from CourseSphere.");
        window.location.reload();
    } catch (err) {
        console.error('Error in Delete:', err);
    }
    }

    function getYouTubeThumbnail(url: string): string | null {                                                                          
        const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;                                                                  
        const match = url.match(regExp);                                                                                                  
                                                                                                                                        
        if (match && match[1]) {                                                                                                          
        const videoId = match[1];                                                                                                       
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;                                                                   
        }                                                                                                                                 
        return null;                                                                                                                      
    }              

  return (
    <div className="w-full border border-gray-300 bg-white hover:bg-teal-50 rounded-xl m-2 sm:m-4 shadow-lg transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 p-2 sm:p-3">

        {thumbnail && (
          <div className="flex-shrink-0 w-full sm:w-32">
            <img
              src={thumbnail}
              alt={lesson.title}
              className="w-full h-32 sm:h-20 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex-1 min-w-0 flex items-center px-2 sm:px-0">
          {(canManageLesson(lesson.id) || canManageCourse(course.id)) ? (
            <Link 
              to={`/course/${course.id}/lesson/${lesson.id}/edit`}
              className="w-full"
            >
              <p className="font-bold text-gray-800 hover:text-teal-600 transition-colors line-clamp-2 text-sm sm:text-base">
                {lesson.title}
              </p>
            </Link>
          ) : (
            <p className="font-bold text-gray-800 line-clamp-2 text-sm sm:text-base">
              {lesson.title}
            </p>
          )}
        </div>

        {/* Delete Button */}
        {canDeleteLesson(course.id, lesson.id) ||  (
          <button
            onClick={() => handleDelete(lesson.id)}
            className="flex-shrink-0 self-center sm:self-stretch w-12 h-12 sm:w-10 sm:h-auto flex items-center 
            justify-center text-red-400 hover:text-red-600 hover:bg-red-50 border-2 border-red-300 hover:border-red-400 rounded-lg 
            font-bold text-lg"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}