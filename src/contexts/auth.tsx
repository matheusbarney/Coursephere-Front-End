import React, { createContext, useState, ReactNode } from 'react';
import api from '../services/api';


interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    courses_instructing: number[];
    courses_owned: number[];
    lessons_created: number[];
}


interface AuthContextType {
    user: User | null;
    Login: (email: string, password: string) => Promise<User>;
    Logout: () => Promise<void>;
    RefreshPermissions: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    }); 

    async function RefreshPermissions(): Promise<void> {
        if (!user) {
            console.warn('No user logged in to refresh permissions');
            return;
        }

        try {
            const [coursesRes, lessonsRes] = await Promise.all([
                api.get('/courses'),
                api.get('/lessons')
            ]);

            const courses = coursesRes.data;
            const lessons = lessonsRes.data;

            // Build authorization arrays
            const courses_owned = courses
                .filter((c: any) => c.creator_id === user.id)
                .map((c: any) => parseInt(c.id));

            const courses_instructing = courses
                .filter((c: any) => c.instructors.includes(user.id))
                .map((c: any) => parseInt(c.id));

            const lessons_created = lessons
                .filter((l: any) => l.creator_id === user.id)
                .map((l: any) => parseInt(l.id));

            // Create enriched user object with updated permissions
            const enrichedUser: User = {
                ...user,
                courses_owned,
                courses_instructing,
                lessons_created
            };

            setUser(enrichedUser);
            localStorage.setItem('user', JSON.stringify(enrichedUser));
            console.log('Permissions refreshed:', enrichedUser);
        } catch (error) {
            console.error("RefreshPermissions error:", error);
            throw error;
        }
    }

    async function Login(email: string, password: string): Promise<User> {
        try {
            const [usersRes, coursesRes, lessonsRes] = await Promise.all([
                api.get('/users'),
                api.get('/courses'),
                api.get('/lessons')
            ]);

            const users = usersRes.data;
            const courses = coursesRes.data;
            const lessons = lessonsRes.data;
            
            const foundUser = users.find((u: User) => u.email === email && u.password === password);
            
            if (!foundUser) {
                throw new Error('Invalid email or password');
            }

            // Build authorization arrays
            const courses_owned = courses
                .filter((c: any) => c.creator_id === foundUser.id)
                .map((c: any) => parseInt(c.id));

            const courses_instructing = courses
                .filter((c: any) => c.instructors.includes(foundUser.id))
                .map((c: any) => parseInt(c.id));

            const lessons_created = lessons
                .filter((l: any) => l.creator_id === foundUser.id)
                .map((l: any) => parseInt(l.id));

            // Create enriched user object
            const enrichedUser: User = {
                ...foundUser,
                courses_owned,
                courses_instructing,
                lessons_created
            };

            setUser(enrichedUser);
            localStorage.setItem('user', JSON.stringify(enrichedUser));
            console.log('Signed in:', enrichedUser);
            return enrichedUser;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

    async function Logout(): Promise<void> {
        setUser(null);
        localStorage.removeItem('user');
        console.log('User logged out');
    }

    return (
        <AuthContext.Provider value={{ user, Login, Logout, RefreshPermissions }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;