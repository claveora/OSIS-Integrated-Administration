import React, { useEffect, useState } from 'react';
import { Target, Eye, Users, Award, Calendar, TrendingUp } from 'lucide-react';
import api from '@/lib/axios';

const AboutSection: React.FC = () => {
    const [vision, setVision] = useState('');
    const [mission, setMission] = useState('');
    const [activeCard, setActiveCard] = useState<number | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.get('/settings');
                setVision(response.data.osis_vision || 'Menjadi organisasi siswa yang profesional, inovatif, dan berprestasi');
                setMission(response.data.osis_mission || 'Mengembangkan potensi siswa melalui kegiatan yang positif dan bermanfaat');
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            }
        };

        fetchSettings();
    }, []);

    const stats = [
        { icon: Users, value: '10+', label: 'Divisi Aktif', color: '#3B4D3A' },
        { icon: Award, value: '50+', label: 'Anggota OSIS', color: '#E8DCC3' },
        { icon: Calendar, value: '20+', label: 'Program Kerja', color: '#6E8BA3' }
    ];

    return (
        <section id="about" className="py-20 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)' }}>
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #3B4D3A 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #E8DCC3 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
            
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#3B4D3A' }}>
                        Tentang OSIS
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6E8BA3' }}>
                        Organisasi Siswa Intra Sekolah yang berkomitmen untuk mengembangkan potensi dan karakter siswa
                    </p>
                    <div className="w-24 h-1 mx-auto rounded-full mt-6" style={{ backgroundColor: '#E8DCC3' }} />
                </div>

                {/* Visi & Misi Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Visi Card */}
                    <div 
                        className="group relative p-8 rounded-3xl shadow-lg transform transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
                        style={{ 
                            backgroundColor: '#ffffff',
                            border: '2px solid',
                            borderColor: activeCard === 0 ? '#3B4D3A' : 'transparent'
                        }}
                        onMouseEnter={() => setActiveCard(0)}
                        onMouseLeave={() => setActiveCard(null)}
                    >
                        {/* Gradient Overlay */}
                        <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                            style={{ background: 'linear-gradient(135deg, #3B4D3A 0%, transparent 100%)' }}
                        />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div 
                                    className="p-4 rounded-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg"
                                    style={{ 
                                        background: 'linear-gradient(135deg, #3B4D3A 0%, #2a3729 100%)'
                                    }}
                                >
                                    <Eye className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold" style={{ color: '#3B4D3A' }}>Visi</h3>
                                    <div className="w-16 h-1 rounded-full mt-2" style={{ backgroundColor: '#3B4D3A' }} />
                                </div>
                            </div>
                            <p className="text-lg leading-relaxed" style={{ color: '#6E8BA3' }}>
                                {vision}
                            </p>
                        </div>
                        
                        {/* Corner Decoration */}
                        <div 
                            className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-10"
                            style={{ backgroundColor: '#3B4D3A' }}
                        />
                    </div>

                    {/* Misi Card */}
                    <div 
                        className="group relative p-8 rounded-3xl shadow-lg transform transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
                        style={{ 
                            backgroundColor: '#ffffff',
                            border: '2px solid',
                            borderColor: activeCard === 1 ? '#E8DCC3' : 'transparent'
                        }}
                        onMouseEnter={() => setActiveCard(1)}
                        onMouseLeave={() => setActiveCard(null)}
                    >
                        {/* Gradient Overlay */}
                        <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                            style={{ background: 'linear-gradient(135deg, #E8DCC3 0%, transparent 100%)' }}
                        />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div 
                                    className="p-4 rounded-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg"
                                    style={{ 
                                        background: 'linear-gradient(135deg, #E8DCC3 0%, #d4c4a8 100%)'
                                    }}
                                >
                                    <Target className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold" style={{ color: '#3B4D3A' }}>Misi</h3>
                                    <div className="w-16 h-1 rounded-full mt-2" style={{ backgroundColor: '#E8DCC3' }} />
                                </div>
                            </div>
                            <p className="text-lg leading-relaxed" style={{ color: '#6E8BA3' }}>
                                {mission}
                            </p>
                        </div>
                        
                        {/* Corner Decoration */}
                        <div 
                            className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-10"
                            style={{ backgroundColor: '#E8DCC3' }}
                        />
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="relative">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2" style={{ color: '#3B4D3A' }}>
                            Pencapaian Kami
                        </h3>
                        <p style={{ color: '#6E8BA3' }}>Bukti nyata dedikasi dan kerja keras OSIS</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div 
                                    key={index}
                                    className="group relative p-8 rounded-2xl transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer overflow-hidden"
                                    style={{ backgroundColor: '#ffffff', border: '1px solid #f0f0f0' }}
                                >
                                    {/* Animated Background */}
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ 
                                            background: `linear-gradient(135deg, ${stat.color}15 0%, transparent 100%)`
                                        }}
                                    />
                                    
                                    <div className="relative z-10 text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" style={{ backgroundColor: `${stat.color}20` }}>
                                            <Icon className="w-8 h-8" style={{ color: stat.color }} />
                                        </div>
                                        <div className="text-5xl font-bold mb-2 transform group-hover:scale-110 transition-transform duration-500" style={{ color: stat.color }}>
                                            {stat.value}
                                        </div>
                                        <div className="font-semibold" style={{ color: '#6E8BA3' }}>
                                            {stat.label}
                                        </div>
                                    </div>
                                    
                                    {/* Progress Bar Animation */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                                        <div 
                                            className="h-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"
                                            style={{ backgroundColor: stat.color }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ backgroundColor: '#3B4D3A10' }}>
                        <TrendingUp className="w-5 h-5" style={{ color: '#3B4D3A' }} />
                        <span className="font-semibold" style={{ color: '#3B4D3A' }}>
                            Terus Berkembang dan Berinovasi
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;