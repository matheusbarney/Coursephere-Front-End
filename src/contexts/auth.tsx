import React, { createContext, useState, ReactNode } from 'react';
import api from '../services/api';


interface User {
    id: number;
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

    async function Login(email: string, password: string): Promise<User> {
        try {
            const response = await api.get('/users');
            const users = response.data;
            
            const foundUser = users.find((u: User) => u.email === email && u.password === password);

            if (foundUser) {
                setUser(foundUser);
                localStorage.setItem('user', JSON.stringify(foundUser));
                console.log('Signed:', foundUser);
                return foundUser;
            } else {
                throw new Error('Invalid email or password');
            }
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
        <AuthContext.Provider value={{ user, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;