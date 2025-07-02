import {ArrowRight, BookOpen, Rocket, TrendingUp, Users} from "lucide-react";
import React from "react";

const BecomeInstructor = () => {
    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-content">
                    <h2 className="cta-title">Gabung Sebagai Pengajar</h2>
                    <p className="cta-subtitle">Punya keahlian? Bagikan melalui kursus online.</p>
                    <p className="cta-description">
                        Kami bantu kamu membuat, menerbitkan, dan menjangkau ribuan pelajar di seluruh Indonesia
                        dengan platform terdepan.
                    </p>

                    <div className="cta-features">
                        <div className="cta-feature">
                            <div className="cta-feature-icon">
                                <BookOpen size={40}/>
                            </div>
                            <h3 className="cta-feature-title">Buat Kursus</h3>
                            <p className="cta-feature-description">Platform mudah untuk membuat konten berkualitas
                                dengan tools profesional</p>
                        </div>

                        <div className="cta-feature">
                            <div className="cta-feature-icon">
                                <Users size={40}/>
                            </div>
                            <h3 className="cta-feature-title">Jangkau Siswa</h3>
                            <p className="cta-feature-description">Akses ke ribuan pelajar aktif yang siap belajar
                                dari expertise Anda</p>
                        </div>

                        <div className="cta-feature">
                            <div className="cta-feature-icon">
                                <TrendingUp size={40}/>
                            </div>
                            <h3 className="cta-feature-title">Raih Penghasilan</h3>
                            <p className="cta-feature-description">Monetisasi keahlian Anda dengan sistem revenue
                                sharing yang menguntungkan</p>
                        </div>
                    </div>

                    <button className="btn btn-white btn-lg">
                        <Rocket size={24}/>
                        Daftar Sebagai Pengajar
                        <ArrowRight size={24}/>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default BecomeInstructor;