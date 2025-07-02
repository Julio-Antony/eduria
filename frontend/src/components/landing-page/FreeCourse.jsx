import {ArrowRight, Clock, Palette, Play, Star, TrendingUp} from "lucide-react";
import React from "react";

const FreeCourse = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Kursus Gratis Terpopuler</h2>
                    <p className="section-description">Mulai perjalanan belajar Anda dengan kursus gratis
                        berkualitas tinggi</p>
                </div>

                <div className="card-grid" style={{marginBottom: '4rem'}}>
                    <div className="course-card">
                        <div className="course-card-header course-card-header-blue">
                            <Play className="course-card-icon"/>
                        </div>
                        <div className="course-card-content">
                            <h3 className="course-card-title">Belajar Python untuk Pemula</h3>
                            <p className="course-card-description">Pelajari dasar-dasar programming Python dari nol
                                hingga mahir dengan project nyata</p>
                            <div className="course-card-footer">
                                <span className="course-badge">GRATIS</span>
                                <div className="course-rating">
                                    <Star className="course-rating-star"/>
                                    4.8 (1.2k reviews)
                                </div>
                            </div>
                            <div className="course-meta">
                                <Clock className="course-meta-icon"/>
                                8 jam • 24 video
                            </div>
                        </div>
                    </div>

                    <div className="course-card">
                        <div className="course-card-header course-card-header-green">
                            <TrendingUp className="course-card-icon"/>
                        </div>
                        <div className="course-card-content">
                            <h3 className="course-card-title">Manajemen Waktu untuk Produktivitas</h3>
                            <p className="course-card-description">Tingkatkan produktivitas dengan teknik manajemen
                                waktu yang terbukti efektif</p>
                            <div className="course-card-footer">
                                <span className="course-badge">GRATIS</span>
                                <div className="course-rating">
                                    <Star className="course-rating-star"/>
                                    4.9 (856 reviews)
                                </div>
                            </div>
                            <div className="course-meta">
                                <Clock className="course-meta-icon"/>
                                4 jam • 12 video
                            </div>
                        </div>
                    </div>

                    <div className="course-card">
                        <div className="course-card-header course-card-header-purple">
                            <Palette className="course-card-icon"/>
                        </div>
                        <div className="course-card-content">
                            <h3 className="course-card-title">Dasar-Dasar UI/UX Design</h3>
                            <p className="course-card-description">Pelajari prinsip desain user interface dan user
                                experience untuk pemula</p>
                            <div className="course-card-footer">
                                <span className="course-badge">GRATIS</span>
                                <div className="course-rating">
                                    <Star className="course-rating-star"/>
                                    4.7 (943 reviews)
                                </div>
                            </div>
                            <div className="course-meta">
                                <Clock className="course-meta-icon"/>
                                6 jam • 18 video
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{textAlign: 'center'}}>
                    <button className="btn btn-green btn-lg">
                        <Play size={20}/>
                        Akses Kursus Gratis
                        <ArrowRight size={20}/>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default FreeCourse;