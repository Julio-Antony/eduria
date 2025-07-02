import {ArrowRight, GraduationCap, Heart, Laptop, Palette, Search, TrendingUp} from "lucide-react";
import React from "react";

const CourseCategories = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Kategori Kursus Populer</h2>
                    <p className="section-description">Temukan kursus sesuai minat dan kebutuhan karir Anda dari
                        berbagai bidang keahlian</p>
                </div>

                <div className="card-grid" style={{marginBottom: '4rem'}}>
                    <div className="category-card">
                        <div className="category-card-content">
                            <Laptop className="category-card-icon"/>
                            <h3 className="category-card-title">Teknologi & Programming</h3>
                            <p className="category-card-description">Web Development, Mobile Apps, AI/ML, Data
                                Science</p>
                            <div className="category-card-footer">
                                <span>120+ Kursus</span>
                                <ArrowRight size={16} style={{marginLeft: '0.5rem'}}/>
                            </div>
                        </div>
                    </div>

                    <div className="category-card category-card-green">
                        <div className="category-card-content">
                            <TrendingUp className="category-card-icon"/>
                            <h3 className="category-card-title">Bisnis & Manajemen</h3>
                            <p className="category-card-description">Leadership, Marketing, Finance, Strategy</p>
                            <div className="category-card-footer">
                                <span>85+ Kursus</span>
                                <ArrowRight size={16} style={{marginLeft: '0.5rem'}}/>
                            </div>
                        </div>
                    </div>

                    <div className="category-card category-card-purple">
                        <div className="category-card-content">
                            <Heart className="category-card-icon"/>
                            <h3 className="category-card-title">Pengembangan Diri</h3>
                            <p className="category-card-description">Personal Growth, Mindfulness, Communication</p>
                            <div className="category-card-footer">
                                <span>60+ Kursus</span>
                                <ArrowRight size={16} style={{marginLeft: '0.5rem'}}/>
                            </div>
                        </div>
                    </div>

                    <div className="category-card category-card-pink">
                        <div className="category-card-content">
                            <Palette className="category-card-icon"/>
                            <h3 className="category-card-title">Desain & Kreativitas</h3>
                            <p className="category-card-description">UI/UX, Graphic Design, Photography, Video</p>
                            <div className="category-card-footer">
                                <span>75+ Kursus</span>
                                <ArrowRight size={16} style={{marginLeft: '0.5rem'}}/>
                            </div>
                        </div>
                    </div>

                    <div className="category-card category-card-orange">
                        <div className="category-card-content">
                            <GraduationCap className="category-card-icon"/>
                            <h3 className="category-card-title">Pendidikan & Pengajaran</h3>
                            <p className="category-card-description">Teaching Methods, Curriculum Design</p>
                            <div className="category-card-footer">
                                <span>45+ Kursus</span>
                                <ArrowRight size={16} style={{marginLeft: '0.5rem'}}/>
                            </div>
                        </div>
                    </div>

                    <div className="category-card category-card-indigo">
                        <div className="category-card-content">
                            <Search className="category-card-icon"/>
                            <h3 className="category-card-title">Sains & Penelitian</h3>
                            <p className="category-card-description">Data Science, Research Methods, Analytics</p>
                            <div className="category-card-footer">
                                <span>55+ Kursus</span>
                                <ArrowRight size={16} style={{marginLeft: '0.5rem'}}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{textAlign: 'center'}}>
                    <button className="btn btn-primary btn-lg">
                        <Search size={20}/>
                        Lihat Semua Kategori
                        <ArrowRight size={20}/>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CourseCategories;