import {Award, Clock, MessageCircle, Shield, Smartphone, Users} from "lucide-react";
import React from "react";

const WhySection = () => {
    return (
        <section className="section section-bg-gray">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Kenapa Memilih Eduria?</h2>
                    <p className="section-description">Platform pembelajaran online terdepan dengan fitur terlengkap untuk mendukung perjalanan belajar Anda</p>
                </div>

                <div className="card-grid">
                    <div className="card">
                        <div className="card-icon card-icon-blue">
                            <Clock size={32} />
                        </div>
                        <h3 className="card-title">Akses Fleksibel</h3>
                        <p className="card-text">Belajar di mana saja, kapan saja sesuai dengan jadwal Anda. Akses 24/7 tanpa batasan.</p>
                    </div>

                    <div className="card">
                        <div className="card-icon card-icon-green">
                            <Users size={32} />
                        </div>
                        <h3 className="card-title">Pengajar Profesional</h3>
                        <p className="card-text">Materi diajarkan langsung oleh praktisi dan akademisi berpengalaman di bidangnya.</p>
                    </div>

                    <div className="card">
                        <div className="card-icon card-icon-purple">
                            <Award size={32} />
                        </div>
                        <h3 className="card-title">Sertifikat Resmi</h3>
                        <p className="card-text">Tingkatkan CV-mu dengan sertifikat digital yang diakui industri dan perusahaan.</p>
                    </div>

                    <div className="card">
                        <div className="card-icon card-icon-orange">
                            <MessageCircle size={32} />
                        </div>
                        <h3 className="card-title">Komunitas Interaktif</h3>
                        <p className="card-text">Diskusi, forum, dan mentoring dengan sesama learner dan pengajar expert.</p>
                    </div>

                    <div className="card">
                        <div className="card-icon card-icon-pink">
                            <Smartphone size={32} />
                        </div>
                        <h3 className="card-title">User Friendly</h3>
                        <p className="card-text">Interface yang intuitif, bisa diakses lewat web maupun aplikasi mobile.</p>
                    </div>

                    <div className="card">
                        <div className="card-icon card-icon-indigo">
                            <Shield size={32} />
                        </div>
                        <h3 className="card-title">Kualitas Terjamin</h3>
                        <p className="card-text">Konten berkualitas tinggi dengan update materi terbaru dan relevan.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhySection;