import {Star} from "lucide-react";
import React from "react";

const Testimonial = () => {
    return (<section className="section section-bg-gray">
        <div className="container">
            <div className="section-header">
                <h2 className="section-title">Testimoni Peserta</h2>
                <p className="section-description">Dengar langsung dari mereka yang telah merasakan manfaat
                    belajar di Eduria</p>
            </div>

            <div className="card-grid">
                <div className="testimonial-card">
                    <div className="testimonial-stars">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="testimonial-star"/>
                        ))}
                    </div>
                    <p className="testimonial-text">
                        "Materinya jelas, pengajarnya top! Saya jadi paham data science dari nol. Sekarang kerja
                        sebagai Data Analyst."
                    </p>
                    <div className="testimonial-author">
                        <div className="testimonial-avatar testimonial-avatar-blue">
                            <span>A</span>
                        </div>
                        <div>
                            <p className="testimonial-author-name">Andi Pratama</p>
                            <p className="testimonial-author-role">Data Analyst di Tokopedia</p>
                        </div>
                    </div>
                </div>

                <div className="testimonial-card">
                    <div className="testimonial-stars">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="testimonial-star"/>
                        ))}
                    </div>
                    <p className="testimonial-text">
                        "Sertifikat dari platform ini saya lampirkan saat melamar kerja. Sangat membantu!
                        Sekarang diterima di perusahaan impian."
                    </p>
                    <div className="testimonial-author">
                        <div className="testimonial-avatar testimonial-avatar-purple">
                            <span>R</span>
                        </div>
                        <div>
                            <p className="testimonial-author-name">Rina Sari</p>
                            <p className="testimonial-author-role">UI/UX Designer di Gojek</p>
                        </div>
                    </div>
                </div>

                <div className="testimonial-card">
                    <div className="testimonial-stars">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="testimonial-star"/>
                        ))}
                    </div>
                    <p className="testimonial-text">
                        "Kursus digital marketing-nya sangat praktis. Langsung bisa diterapkan untuk bisnis
                        online saya. Revenue naik 300%!"
                    </p>
                    <div className="testimonial-author">
                        <div className="testimonial-avatar testimonial-avatar-green">
                            <span>B</span>
                        </div>
                        <div>
                            <p className="testimonial-author-name">Budi Santoso</p>
                            <p className="testimonial-author-role">Entrepreneur</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>);
}

export default Testimonial;