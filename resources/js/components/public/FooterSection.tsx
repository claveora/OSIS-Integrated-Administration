import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const FooterSection: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#1E3A8A] text-white py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">OSINTRA</h3>
                        <p className="text-blue-200 leading-relaxed">
                            Sistem Manajemen OSIS SMKN 6 Surakarta yang modern dan profesional untuk mengelola kegiatan organisasi siswa.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#about" className="text-blue-200 hover:text-[#FFD700] transition-colors">
                                    Tentang Kami
                                </a>
                            </li>
                            <li>
                                <a href="#divisions" className="text-blue-200 hover:text-[#FFD700] transition-colors">
                                    Divisi
                                </a>
                            </li>
                            <li>
                                <a href="#gallery" className="text-blue-200 hover:text-[#FFD700] transition-colors">
                                    Galeri
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-blue-200 hover:text-[#FFD700] transition-colors">
                                    Kontak
                                </a>
                            </li>
                            <li>
                                <a href="/login" className="text-blue-200 hover:text-[#FFD700] transition-colors">
                                    Login Dashboard
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Kontak</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-[#FFD700] mt-0.5" />
                                <span className="text-blue-200">osis@smkn6solo.sch.id</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-[#FFD700] mt-0.5" />
                                <span className="text-blue-200">(0271) 123456</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#FFD700] mt-0.5" />
                                <span className="text-blue-200">Jl. LU Adisucipto No. 42, Surakarta</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social Media */}
                <div className="border-t border-blue-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-blue-200 text-sm">
                            © {currentYear} OSIS SMKN 6 Surakarta. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="p-2 bg-blue-700 rounded-lg hover:bg-[#FFD700] hover:text-[#1E3A8A] transition-all duration-300"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-blue-700 rounded-lg hover:bg-[#FFD700] hover:text-[#1E3A8A] transition-all duration-300"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-blue-700 rounded-lg hover:bg-[#FFD700] hover:text-[#1E3A8A] transition-all duration-300"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-blue-700 rounded-lg hover:bg-[#FFD700] hover:text-[#1E3A8A] transition-all duration-300"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
