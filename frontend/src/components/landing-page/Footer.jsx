import {BookOpen, Facebook, Globe, Instagram, Linkedin, Shield, Twitter} from "lucide-react";
import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div>
                        <div className="footer-logo">
                            <div className="footer-logo-icon">
                                <BookOpen size={24}/>
                            </div>
                            <span className="footer-logo-text">EDURIA</span>
                        </div>
                        <p className="footer-description">
                            Platform pembelajaran online terdepan yang menghubungkan pelajar dengan pengajar terbaik
                            di Indonesia.
                        </p>
                        <div className="footer-social">
                            <div className="footer-social-link">
                                <Facebook size={20}/>
                            </div>
                            <div className="footer-social-link">
                                <Twitter size={20}/>
                            </div>
                            <div className="footer-social-link">
                                <Instagram size={20}/>
                            </div>
                            <div className="footer-social-link">
                                <Linkedin size={20}/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-section-title">Perusahaan</h4>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">Tentang Kami</a></li>
                            <li><a href="#" className="footer-link">Visi & Misi</a></li>
                            <li><a href="#" className="footer-link">Tim Kami</a></li>
                            <li><a href="#" className="footer-link">Karir</a></li>
                            <li><a href="#" className="footer-link">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-section-title">Bantuan</h4>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">Pusat Bantuan</a></li>
                            <li><a href="#" className="footer-link">Hubungi Kami</a></li>
                            <li><a href="#" className="footer-link">FAQ</a></li>
                            <li><a href="#" className="footer-link">Panduan Belajar</a></li>
                            <li><a href="#" className="footer-link">Status Sistem</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-section-title">Legal</h4>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">Kebijakan Privasi</a></li>
                            <li><a href="#" className="footer-link">Syarat & Ketentuan</a></li>
                            <li><a href="#" className="footer-link">Kebijakan Cookie</a></li>
                            <li><a href="#" className="footer-link">Panduan Komunitas</a></li>
                            <li><a href="#" className="footer-link">Hak Kekayaan Intelektual</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © 2024 Eduria. Semua hak cipta dilindungi. Dibuat dengan ❤️ untuk kemajuan pendidikan
                        Indonesia.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;