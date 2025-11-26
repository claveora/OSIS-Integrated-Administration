import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import api from '@/lib/axios';
import type { Division } from '@/types';

const DivisionsSection: React.FC = () => {
    const [divisions, setDivisions] = useState<Division[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDivisions = async () => {
            try {
                const response = await api.get('/divisions');
                setDivisions(response.data);
            } catch (error) {
                console.error('Failed to fetch divisions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDivisions();
    }, []);

    if (loading) {
        return (
            <section className="py-20 px-4 bg-[#E5E7EB]">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-gray-600">Memuat divisi...</p>
                </div>
            </section>
        );
    }

    return (
        <section id="divisions" className="py-20 px-4 bg-[#E5E7EB]">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4">
                        Divisi OSIS
                    </h2>
                    <div className="w-24 h-1 bg-[#FFD700] mx-auto rounded-full mb-4" />
                    <p className="text-gray-600 text-lg">
                        Berbagai divisi yang bekerja sama untuk kemajuan OSIS
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {divisions.map((division, index) => (
                        <div
                            key={division.id}
                            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] rounded-xl">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">
                                        {division.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {division.description || 'Divisi yang berperan penting dalam kegiatan OSIS'}
                                    </p>
                                    {division.users_count !== undefined && (
                                        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                                            <Users className="w-4 h-4" />
                                            <span>{division.users_count} Anggota</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {divisions.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Belum ada divisi yang terdaftar</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DivisionsSection;
