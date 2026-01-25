import api from "./api";

interface Course {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    creator_id: number;
    instructors: string[];
}

export const courseService = {
    getAll: async () => {
        const res = await api.get<Course[]>("/courses");
        return res.data;
    },

    getById: async (id) => {
        const res = await api.get<Course>(`/courses/${id}`);
        return res.data;
    },

    getByUser: async (creator_id) => {
        const res = await api.get<Course[]>(`/courses?creator_id=${creator_id}`);
        return res.data;
    },

    deleteById: async (id) => {
        const res = await api.delete<void>(`/courses/${id}`);
        return res.data;
    },

    addCourse: async (courseData) => {
        const response = await api.post<Course>('/courses', courseData);
        return response.data;
    },

    editCourse: async (id, courseData) => {
        const response = await api.put<Course>(`/courses/${id}`, courseData);
        return response.data;
    },

    addInstructor: async (id, user_id) => {
        const course = await courseService.getById(id);
        const updatedInstructors = course.instructors.includes(user_id)
            ? course.instructors
            : [...course.instructors, user_id];
        
        // Update the course with the new instructors array
        const response = await api.patch<Course>(`/courses/${id}`, {
            instructors: updatedInstructors
        });
        return response.data;
    },

    removeInstructor: async (id, user_id) => {
    const course = await courseService.getById(id);
    const updatedInstructors = course.instructors.filter(
        instructorId => instructorId !== user_id
    );
    
    // Update the course with the new instructors array
    const response = await api.patch<Course>(`/courses/${id}`, {
        instructors: updatedInstructors
    });
    return response.data;
    },
}