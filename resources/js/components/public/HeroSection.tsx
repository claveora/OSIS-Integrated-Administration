import React from 'react';
import { ChevronDown, Sparkles, Users, Target } from 'lucide-react';

const HeroSection: React.FC = () => {
    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ 
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59,77,58,0.4) 1px, transparent 0)', 
                backgroundSize: '40px 40px',
                animation: 'patternMove 20s linear infinite'
            }} />

            {/* Gradient orbs with animation */}
            <div className="absolute -left-20 top-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl animate-pulse" 
                 style={{ backgroundColor: '#3B4D3A', animationDuration: '4s' }} />
            <div className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse" 
                 style={{ backgroundColor: '#6E8BA3', animationDuration: '6s', animationDelay: '1s' }} />
            <div className="absolute left-1/2 top-0 w-72 h-72 rounded-full opacity-10 blur-3xl animate-pulse" 
                 style={{ backgroundColor: '#E8DCC3', animationDuration: '5s', animationDelay: '2s' }} />

            <div className="relative z-10 text-center px-6 max-w-6xl mx-auto py-20 w-full">
                
                {/* Badge with icon */}
                <div className="mb-8 animate-fadeIn">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm shadow-lg backdrop-blur-sm border border-gray-200/50 hover:scale-105 transition-transform" 
                         style={{ backgroundColor: 'rgba(232, 220, 195, 0.9)', color: '#1E1E1E' }}>
                        <Sparkles className="w-4 h-4" />
                        Organisasi Siswa Intra Sekolah
                    </div>
                </div>

                {/* Main heading with gradient text */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight animate-slideUp" 
                    style={{ 
                        background: 'linear-gradient(135deg, #3B4D3A 0%, #2d3a2c 50%, #1f2820 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                    OSIS SMK NEGERI 6<br />SURAKARTA
                </h1>

                {/* Subtitle with better spacing */}
                <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed animate-slideUp" 
                   style={{ color: '#6E8BA3', animationDelay: '0.2s' }}>
                    Bersama, Berkarya, Berprestasi — Mewujudkan Generasi Emas Berkarakter dan Berjiwa Kepemimpinan.
                </p>

                {/* Feature highlights */}
                <div className="flex flex-wrap gap-6 justify-center mb-12 animate-slideUp" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                        <Users className="w-5 h-5" style={{ color: '#3B4D3A' }} />
                        <span className="font-medium text-sm" style={{ color: '#1E1E1E' }}>Solid & Kompak</span>
                    </div>
                    <div className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                        <Target className="w-5 h-5" style={{ color: '#3B4D3A' }} />
                        <span className="font-medium text-sm" style={{ color: '#1E1E1E' }}>Berprestasi</span>
                    </div>
                    <div className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                        <Sparkles className="w-5 h-5" style={{ color: '#3B4D3A' }} />
                        <span className="font-medium text-sm" style={{ color: '#1E1E1E' }}>Inovatif</span>
                    </div>
                </div>

                {/* CTA Button with enhanced styling */}
                <div className="flex gap-4 justify-center mb-10 animate-slideUp" style={{ animationDelay: '0.4s' }}>
                    <button 
                        onClick={scrollToAbout} 
                        className="group relative px-10 py-4 rounded-xl font-semibold text-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" 
                        style={{ backgroundColor: '#3B4D3A' }}>
                        <span className="relative z-10">Pelajari Lebih Lanjut</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </button>
                </div>

                {/* Animated scroll indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs font-medium" style={{ color: '#6E8BA3' }}>Scroll</span>
                        <ChevronDown className="w-6 h-6" style={{ color: '#6E8BA3' }} />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes patternMove {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(40px, 40px);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out forwards;
                }

                .animate-slideUp {
                    animation: slideUp 0.8s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;