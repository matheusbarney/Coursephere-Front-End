
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

    const addInstructor = async (userId: string | number) => {
        try {
            setLoading(true);
            setError(null);
            const updatedCourse = await courseService.addInstructor(courseId, userId);
            setCourse(updatedCourse);
            return updatedCourse;
        } catch (err) {
            console.error('Error adding instructor:', err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const removeInstructor = async (userId: string) => {
        try {
            setLoading(true);
            setError(null);
            const updatedCourse = await courseService.removeInstructor(courseId, userId);
            setCourse(updatedCourse);
            return updatedCourse;
        } catch (err) {
            console.error('Error removing instructor:', err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { course, loading, error, addInstructor, removeInstructor };
};

export default useCourse;