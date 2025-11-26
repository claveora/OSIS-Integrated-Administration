import api from './axios';
import type { User } from '@/types';

export const login = async (username: string, password: string) => {
    const response = await api.post('/login', { username, password });
    const { user, token } = response.data;
    
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { user, token };
};

export const logout = async () => {
    try {
        await api.post('/logout');
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
    }
};

export const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('auth_token');
};

export const hasPermission = (user: User | null, module: string, action: 'view' | 'create' | 'edit' | 'delete'): boolean => {
    if (!user || !user.role) return false;
    
    const permission = user.role.permissions?.find(p => p.module_name === module);
    if (!permission) return false;
    
    switch (action) {
        case 'view': return permission.can_view;
        case 'create': return permission.can_create;
        case 'edit': return permission.can_edit;
        case 'delete': return permission.can_delete;
        default: return false;
    }
};
