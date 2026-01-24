
import { lessonService } from '../services/lessonService';
import{ useEffect, useState } from 'react';

interface useLessonProps {
    lessonId;
}

export const useLesson = ({lessonId}: useLessonProps ) => {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadLesson = async () => {
            try {
                setLoading(true);
                const data = await lessonService.getById(lessonId);
                setLesson(data);
                setError(null);
            } catch (err) {
                console.error('Error loading lesson:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadLesson();
    }, [lessonId]);

    return { lesson, loading, error };
};

export default useLesson;