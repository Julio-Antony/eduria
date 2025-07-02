import {ArrowRight, BookOpen, Play, Star} from "lucide-react";
import React from "react";

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-bg"></div>
            <div className="hero-blob hero-blob-1"></div>
            <div className="hero-blob hero-blob-2"></div>

            <div className="container">
                <div className="hero-content">
                    <div className="hero-badge">
                        <Star size={16} style={{ marginRight: '0.5rem' }} />
                        Platform pembelajaran #1 di Indonesia
                    </div>

                    <h1 className="hero-title">
                        Belajar Kapan Saja,
                        <span className="hero-title-gradient"> Di Mana Saja</span>
                    </h1>

                    <p className="hero-subtitle">
                        Kursus Online Bersertifikat dari Para Ahli Terbaik di Bidangnya
                    </p>

                    <p className="hero-description">
                        Tingkatkan skill dan pengetahuanmu dengan ratusan kursus dari berbagai bidang — gratis dan berbayar.
                    </p>

                    <div className="hero-buttons">
                        <button className="btn btn-primary btn-lg">
                            <BookOpen size={20} />
                            Mulai Belajar Sekarang
                            <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="hero-stat-number">10K+</div>
                            <div className="hero-stat-label">Siswa Aktif</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-number">500+</div>
                            <div className="hero-stat-label">Kursus</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-number">100+</div>
                            <div className="hero-stat-label">Pengajar</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-number">95%</div>
                            <div className="hero-stat-label">Kepuasan</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;