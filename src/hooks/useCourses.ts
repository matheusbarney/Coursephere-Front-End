
import { courseService } from '../services/courseService';
import{ useEffect, useState } from 'react';

interface useCoursesProps {
    userId?
}

export const useCourses = ({ userId }: useCoursesProps = {}) => {
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                setLoading(true);
                const data = userId
                    ? await courseService.getByUser(userId) 
                    : await courseService.getAll();
                setCourses(data);
                setError(null);
            } catch (err) {
                console.error('Error loading courses:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, [userId]);

    return { courses, loading, error };
};

export default useCourses;