
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

    const deleteLesson = async (lessonId: number) => {
        try {
            setLoading(true);
            setError(null);
            await lessonService.deleteById(lessonId);
            setLesson(null);
        } catch (err) {
            console.error('Error deleting lesson:', err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { lesson, loading, error };
};

export default useLesson;