import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();
const CURRENT_USER_KEY = "currentUser";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  // Загрузка пользователя при старте
    useEffect(() => {
        const savedUser = localStorage.getItem(CURRENT_USER_KEY);
        if (savedUser) {
        setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const register = (email, password, name) => {
        if (!email || !password || !name) {
        return { success: false, error: "Заполните все поля" };
        }
        
        // Проверка на регистрацию
        const users = JSON.parse(localStorage.getItem("users") || "{}");
        if (users[email]) {
        return { success: false, error: "Пользователь уже существует" };
        }
        
        // Сохранение пользователя
        users[email] = { id: Date.now(), email, password, name };
        localStorage.setItem("users", JSON.stringify(users));
        
        // Автоматический вход
        const userData = { id: Date.now(), email, name };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
        setUser(userData);
        
        return { success: true };
    };

    const login = (email, password) => {
        if (!email || !password) {
        return { success: false, error: "Заполните все поля" };
        }
        
        const users = JSON.parse(localStorage.getItem("users") || "{}");
        const existingUser = users[email];
        
        if (!existingUser) {
        return { success: false, error: "Пользователь не найден" };
        }
        
        if (existingUser.password !== password) {
        return { success: false, error: "Неверный пароль" };
        }
        
        const userData = { id: existingUser.id, email, name: existingUser.name };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
        setUser(userData);
        
        return { success: true };
    };

    const logout = () => {
        localStorage.removeItem(CURRENT_USER_KEY);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    };

export const useAuth = () => useContext(AuthContext);