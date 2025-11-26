import React from 'react';
import { Link } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Users, 
    FolderKanban, 
    Mail, 
    DollarSign, 
    Settings, 
    UserCircle,
    LogOut,
    X,
    FileText,
    Building2
} from 'lucide-react';
import api from '@/lib/axios';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const user = { name: 'Admin', role: { name: 'Admin' } };

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', module: 'Dashboard' },
        { name: 'Divisi', icon: Building2, path: '/dashboard/divisions', module: 'Divisions' },
        { name: 'Pengguna', icon: Users, path: '/dashboard/users', module: 'Users' },
        { name: 'Program Kerja', icon: FolderKanban, path: '/dashboard/prokers', module: 'Prokers' },
        { name: 'Pesan', icon: Mail, path: '/dashboard/messages', module: 'Messages' },
        { name: 'Keuangan', icon: DollarSign, path: '/dashboard/transactions', module: 'Transactions' },
        { name: 'Log Aktivitas', icon: FileText, path: '/dashboard/audit-logs', module: 'AuditLogs' },
        { name: 'Pengaturan', icon: Settings, path: '/dashboard/settings', module: 'Settings' },
        { name: 'Profil', icon: UserCircle, path: '/dashboard/profile', module: 'Profile' },
    ];

    const filteredMenuItems = menuItems;

    const handleLogout = async () => {
        try {
            await api.post('/logout');
            localStorage.removeItem('auth_token');
        } catch (error) {
            console.error('Logout error:', error);
        }
        window.location.href = '/login';
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-[#3B4D3A] text-white w-72 transform transition-transform duration-300 z-50 shadow-2xl ${
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-[#4A5F49]">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-[#E8DCC3] tracking-wide">OSINTRA</h1>
                                <p className="text-sm text-[#E8DCC3]/70 mt-1 font-medium">Management System</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="lg:hidden text-[#E8DCC3] hover:text-white hover:bg-[#4A5F49] p-2 rounded-lg transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="p-6 border-b border-[#4A5F49] bg-[#2F3D2E]">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-[#E8DCC3] rounded-full flex items-center justify-center text-[#3B4D3A] font-bold text-xl shadow-lg ring-2 ring-[#4A5F49]">
                                {user?.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-white text-lg">{user?.name}</p>
                                <p className="text-sm text-[#E8DCC3]/80 font-medium">{user?.role?.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#4A5F49] scrollbar-track-transparent">
                        <ul className="space-y-2">
                            {filteredMenuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = window.location.pathname === item.path;
                                
                                return (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-[#E8DCC3] text-[#3B4D3A] shadow-md scale-105'
                                                    : 'text-[#E8DCC3]/90 hover:bg-[#4A5F49] hover:text-white hover:pl-6'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5 flex-shrink-0" />
                                            <span className="text-sm">{item.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-[#4A5F49] bg-[#2F3D2E]">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-[#E8DCC3]/90 hover:bg-red-600 hover:text-white font-medium transition-all duration-200 group"
                        >
                            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span className="text-sm">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;