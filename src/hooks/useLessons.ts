
import { lessonService } from '../services/lessonService';
import{ useEffect, useState } from 'react';

interface useLessonsProps {
    courseId?: string
}

export const useLessons = ({ courseId }: useLessonsProps = {}) => {
    const [lessons, setLessons] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadLessons = async () => {
            try {
                setLoading(true);
                const data = courseId 
                    ? await lessonService.getByCourse(courseId) 
                    : await lessonService.getAll();
                setLessons(data);
                setError(null);
            } catch (err) {
                console.error('Error loading lessons:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadLessons();
    }, [courseId]);

    return { lessons, loading, error };
};

export default useLessons;