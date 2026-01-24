import api from "./api";

interface Lesson {
    id: string | number;
    course_id: string | number;
    creator_id: string | number;
    title: string;
    status: "draft" | "published" | "archived";
    publish_date: string;
    video_url: string;
}

export const lessonService = {
    getAll: async () => {
        const res = await api.get<Lesson[]>("/lessons");
        return res.data;
    },

    getById: async (id) => {
        const res = await api.get<Lesson>(`/lessons/${id}`);
        return res.data;
    },

    getByCourse: async (course_id) => {
        const res = await api.get<Lesson[]>(`/lessons?course_id=${course_id}`);
        return res.data;
    },

    deleteById: async (id) => {
        const res = await api.delete<void>(`/lessons/${id}`);
        return res.data;
    },

    addLesson: async (lessonData) => {
        const response = await api.post<Lesson>('/lessons', lessonData);
        return response.data;
    },

    editLesson: async (id, lessonData) => {
        const response = await api.put<Lesson>(`/lessons/${id}`, lessonData);
        return response.data;
    },

}