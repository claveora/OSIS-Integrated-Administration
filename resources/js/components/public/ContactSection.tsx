import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import api from '@/lib/axios';

const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await api.post('/messages', formData);
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSuccess(false), 5000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Gagal mengirim pesan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="py-20 px-4 bg-[#E5E7EB]">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4">
                        Hubungi Kami
                    </h2>
                    <div className="w-24 h-1 bg-[#FFD700] mx-auto rounded-full mb-4" />
                    <p className="text-gray-600 text-lg">
                        Ada pertanyaan? Kirim pesan kepada kami
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-[#1E3A8A] rounded-xl">
                                    <Mail className="w-6 h-6 text-[#FFD700]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#1E3A8A] mb-1">Email</h3>
                                    <p className="text-gray-600">osis@smkn6solo.sch.id</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-[#1E3A8A] rounded-xl">
                                    <Phone className="w-6 h-6 text-[#FFD700]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#1E3A8A] mb-1">Telepon</h3>
                                    <p className="text-gray-600">(0271) 123456</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-[#1E3A8A] rounded-xl">
                                    <MapPin className="w-6 h-6 text-[#FFD700]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#1E3A8A] mb-1">Alamat</h3>
                                    <p className="text-gray-600">Jl. LU Adisucipto No. 42, Surakarta</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none transition-all"
                                    placeholder="Nama lengkap Anda"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none transition-all"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                                    Subjek
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none transition-all"
                                    placeholder="Subjek pesan"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                                    Pesan
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Tulis pesan Anda di sini..."
                                />
                            </div>

                            {success && (
                                <div className="p-4 bg-green-100 text-green-700 rounded-xl">
                                    Pesan berhasil dikirim! Terima kasih.
                                </div>
                            )}

                            {error && (
                                <div className="p-4 bg-red-100 text-red-700 rounded-xl">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-4 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white rounded-xl font-semibold hover:from-[#1E40AF] hover:to-[#3B82F6] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Mengirim...' : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Kirim Pesan
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
