
import { courseService } from '../services/courseService';
import{ useEffect, useState } from 'react';

interface useCourseProps {
    courseId: string
}

export const useCourse = ({courseId}: useCourseProps ) => {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourse = async () => {
            try {
                setLoading(true);
                const data = await courseService.getById(courseId);
                setCourse(data);
                setError(null);
            } catch (err) {
                console.error('Error loading course:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadCourse();
    }, [courseId]);

    
};

export default useCourse;