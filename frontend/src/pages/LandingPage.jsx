import React from 'react';
import '../assets/css/landing-page.css'
import Hero from "../components/landing-page/Hero";
import Navbar from "../components/landing-page/Navbar";
import WhySection from "../components/landing-page/WhySection";
import CourseCategories from "../components/landing-page/CourseCategories";
import Testimonial from "../components/landing-page/Testimonial";
import FreeCourse from "../components/landing-page/FreeCourse";
import BecomeInstructor from "../components/landing-page/BecomeInstructor";
import Footer from "../components/landing-page/Footer";

const LandingPage = () => {
    return (
        <div style={{minHeight: '100vh', backgroundColor: 'white'}}>
            {/* Navigation */}
            <Navbar/>

            {/* Hero Section */}
            <Hero/>

            {/* Why Choose Us Section */}
            <WhySection/>

            {/* Course Categories Section */}
            <CourseCategories/>

            {/* Testimonials Section */}
            <Testimonial/>

            {/* Free Courses Section */}
            <FreeCourse/>

            {/* Become Instructor Section */}
            <BecomeInstructor/>

            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default LandingPage;