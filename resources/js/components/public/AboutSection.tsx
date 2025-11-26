import React, { useEffect, useState } from 'react';
import { Target, Eye } from 'lucide-react';
import api from '@/lib/axios';

const AboutSection: React.FC = () => {
    const [vision, setVision] = useState('');
    const [mission, setMission] = useState('');

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

    return (
        <section id="about" className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4">
                        Tentang OSIS
                    </h2>
                    <div className="w-24 h-1 bg-[#FFD700] mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Visi */}
                    <div className="bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] p-8 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-[#FFD700] rounded-xl">
                                <Eye className="w-8 h-8 text-[#1E3A8A]" />
                            </div>
                            <h3 className="text-3xl font-bold">Visi</h3>
                        </div>
                        <p className="text-lg leading-relaxed text-blue-100">
                            {vision}
                        </p>
                    </div>

                    {/* Misi */}
                    <div className="bg-gradient-to-br from-[#FFD700] to-yellow-400 p-8 rounded-2xl text-[#1E3A8A] shadow-xl transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-[#1E3A8A] rounded-xl">
                                <Target className="w-8 h-8 text-[#FFD700]" />
                            </div>
                            <h3 className="text-3xl font-bold">Misi</h3>
                        </div>
                        <p className="text-lg leading-relaxed">
                            {mission}
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-[#E5E7EB] rounded-2xl">
                        <div className="text-4xl font-bold text-[#1E3A8A] mb-2">10+</div>
                        <div className="text-gray-600">Divisi Aktif</div>
                    </div>
                    <div className="p-6 bg-[#E5E7EB] rounded-2xl">
                        <div className="text-4xl font-bold text-[#1E3A8A] mb-2">50+</div>
                        <div className="text-gray-600">Anggota OSIS</div>
                    </div>
                    <div className="p-6 bg-[#E5E7EB] rounded-2xl">
                        <div className="text-4xl font-bold text-[#1E3A8A] mb-2">20+</div>
                        <div className="text-gray-600">Program Kerja</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
