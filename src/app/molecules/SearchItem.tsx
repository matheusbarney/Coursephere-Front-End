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

    return <div className="w h-20 border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 
                            bg-white hover:bg-teal-50 rounded-xl m-4 flex flex-col justify-between leading-normal shadow-lg  ">
                            <div className="flex justify-between ">
                                {thumbnail && (                                                                                                                     
                                    <img                                                                                                                              
                                    src={thumbnail}                                                                                                                 
                                    alt={lesson.title}                                                                                                              
                                    className="h-20 w-auto object-cover rounded-xl"                                                                                      
                                    />                                                                                                                                
                                )}         
                                {canManageLesson(lesson.id) ? (
                                    <Link to={`/course/${course.id}/lesson/${lesson.id}/edit`}>
                                        <p className="font-bold m-2 text-black-200 break-words flex-1 mx-2 overflow-hidden" style={{fontSize: 'clamp(0.75rem, 2vw, 1rem)'}}>{lesson.title}</p>
                                    </Link>
                                ) : (
                                        <p className="font-bold text-center m-2 text-black-200 break-words flex-1 mx-2 overflow-hidden" style={{fontSize: 'clamp(0.75rem, 2vw, 1rem)'}}>{lesson.title}</p>
                                )}
                                { canDeleteLesson(course.id,lesson.id) && (<p className="text-red-300 w-min h-20 flex justify-center 
                                flex-col items-center text-xl bold border-2 rounded-xl p-1.5 hover:bg-red-100"
                                onClick={() => handleDelete(lesson.id)}
                                >X</p>)}
                            </div>
            </div>;
    }
  