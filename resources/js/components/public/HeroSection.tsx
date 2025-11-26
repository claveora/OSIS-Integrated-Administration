import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#2563EB] text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
                <div className="mb-6">
                    <div className="inline-block px-6 py-2 bg-[#FFD700] text-[#1E3A8A] rounded-full font-semibold text-sm mb-8">
                        OSIS SMKN 6 Surakarta
                    </div>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    OSINTRA
                </h1>
                
                <p className="text-xl md:text-2xl mb-4 text-blue-100">
                    OSIS Interactive Administration
                </p>
                
                <p className="text-lg md:text-xl mb-12 text-blue-200 max-w-3xl mx-auto">
                    Sistem Manajemen Organisasi Siswa Intra Sekolah yang Modern, Profesional, dan Inovatif
                </p>

                <div className="flex gap-4 justify-center flex-wrap">
                    <button
                        onClick={scrollToAbout}
                        className="px-8 py-4 bg-[#FFD700] text-[#1E3A8A] rounded-2xl font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Pelajari Lebih Lanjut
                    </button>
                    <a
                        href="/login"
                        className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 border-2 border-white/30"
                    >
                        Login Dashboard
                    </a>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown className="w-8 h-8 text-white/70" />
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-[#FFD700] rounded-full opacity-20 blur-xl" />
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#FFD700] rounded-full opacity-20 blur-xl" />
        </section>
    );
};

export default HeroSection;
