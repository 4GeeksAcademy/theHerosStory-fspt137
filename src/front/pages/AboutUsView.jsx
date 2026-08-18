import React from "react";
import { Link } from "react-router-dom";

export const AboutUsView = () => {
    return (
        <div className="about-us-page bg-white w-100" style={{ fontFamily: "'Inter', sans-serif" }}>

            <div
                className="about-hero-banner py-5 d-flex align-items-center text-white"
                style={{
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://www.olympion-sunset.com/cache/com_zoo/images/ZON6936_4c0828c94247c5be5011d1d4be0c5533.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "220px"
                }}
            >
                <div className="container-fluid text-start px-3 px-md-5">
                    <h1 className="display-4 fw-bold m-0" style={{ letterSpacing: "-1px" }}>About Us</h1>
                </div>
            </div>


            <div className="container-fluid py-5 mt-4">
                <div className="row justify-content-center m-0">
                    <div className="col-12 col-xl-8 col-lg-10">

                        <div className="row align-items-stretch font-sans-serif g-4 g-lg-5">

                            <div className="col-lg-6 col-md-12 d-flex flex-column">
                                <div className="w-100 h-100 position-relative flex-grow-1" style={{ minHeight: "350px" }}>
                                    <img
                                        src="https://thesimpsonian.com/wp-content/uploads/2021/02/student-work-900x596.jpg"
                                        alt="Students working"
                                        className="position-absolute top-0 start-0 w-100 h-100 rounded shadow-sm"
                                        style={{ objectFit: "cover", objectPosition: "center" }}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 text-start d-flex flex-column justify-content-center gap-3">
                                <span className="text-danger fw-bold text-uppercase small" style={{ letterSpacing: "1px" }}>
                                    About Us
                                </span>
                                <h2 className="fw-black text-dark display-6 m-0 lh-sm" style={{ letterSpacing: "-1px" }}>
                                    Learn New Skills to go ahead for Your Career
                                </h2>
                                <p className="fw-bold text-dark m-0 fs-6">
                                    We can support student forum 24/7 for national and international students.
                                </p>
                                <p className="text-muted m-0 small lh-base" style={{ color: "#7a7a7a" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>

                                <div className="d-flex align-items-start gap-3 mt-2">
                                    <span className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center p-1" style={{ width: "24px", height: "24px", fontSize: "12px" }}>
                                        ✓
                                    </span>
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">Every path is different</h6>
                                        <p className="text-muted small m-0">Your unique background shapes your growth, ensuring that your learning experience belongs entirely to you.</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-start gap-3 mt-2">
                                    <span className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center p-1" style={{ width: "24px", height: "24px", fontSize: "12px" }}>
                                        ✓
                                    </span>
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">Take little steps</h6>
                                        <p className="text-muted small m-0">Big changes come from small actions; consistency every day transforms your goals into real success.</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-start gap-3 mt-2">
                                    <span className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center p-1" style={{ width: "24px", height: "24px", fontSize: "12px" }}>
                                        ✓
                                    </span>
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">Get closer to your goals</h6>
                                        <p className="text-muted small m-0">Stay focused and move forward daily; our platform provides the support to reach your dreams.</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-start gap-3 mt-2">
                                    <span className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center p-1" style={{ width: "24px", height: "24px", fontSize: "12px" }}>
                                        ✓
                                    </span>
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">Plan new objectives</h6>
                                        <p className="text-muted small m-0">Clear targets guide your journey; map out your future and execute each milestone with confidence.</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div className="w-100 py-5 bg-light border-top border-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-8 offset-lg-2">
                            <div className="row text-start g-4">

                                <div className="col-md-4 d-flex flex-column gap-3">
                                    <h4 className="fw-bold text-dark m-0 fs-5">100,000 services</h4>
                                    <p className="text-muted small m-0">Growing service platform with more variety coming soon.</p>
                                    <ul className="list-unstyled d-flex flex-column gap-2 small text-muted p-0 m-0">
                                        <li><span className="text-secondary me-2">✓</span> Activate Listening</li>
                                        <li><span className="text-secondary me-2">✓</span> Brilliant minds</li>
                                        <li><span className="text-secondary me-2">✓</span> Nutrition!</li>
                                        <li><span className="text-secondary me-2">✓</span> Sports!</li>
                                    </ul>
                                </div>

                                <div className="col-md-4 d-flex flex-column gap-3">
                                    <h4 className="fw-bold text-dark m-0 fs-5">Mentor instruction</h4>
                                    <p className="text-muted small m-0">Close guidance and free interviews.</p>
                                    <ul className="list-unstyled d-flex flex-column gap-2 small text-muted p-0 m-0">
                                        <li><span className="text-secondary me-2">✓</span> Creating. Results.</li>
                                        <li><span className="text-secondary me-2">✓</span> Expect more</li>
                                        <li><span className="text-secondary me-2">✓</span> Good thinking</li>
                                        <li><span className="text-secondary me-2">✓</span> Good enviroment</li>
                                    </ul>
                                </div>

                                <div className="col-md-4 d-flex flex-column gap-3">
                                    <h4 className="fw-bold text-dark m-0 fs-5">Lifetime access</h4>
                                    <p className="text-muted small m-0">Real innovations and a positive customer experience are the heart of successful coaching.</p>
                                    <ul className="list-unstyled d-flex flex-column gap-2 small text-muted p-0 m-0">
                                        <li><span className="text-secondary me-2">✓</span> Stay real. Always.</li>
                                        <li><span className="text-secondary me-2">✓</span> We have you covered</li>
                                        <li><span className="text-secondary me-2">✓</span> We turn heads</li>
                                        <li><span className="text-secondary me-2">✓</span> Your brand, promoted</li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-5 mt-3">
                <div className="row">
                    <div className="col-12 col-lg-8 offset-lg-2">
                        <div className="row text-start align-items-start">
                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                <h2 className="display-6 fw-black text-dark m-0" style={{ letterSpacing: "-1px" }}>Our Story</h2>
                            </div>
                            <div className="col-lg-9 col-md-12 d-flex flex-column gap-4">
                                <div>
                                    <h5 className="fw-bold text-dark mb-2">A better future starts here</h5>
                                    <p className="text-muted small m-0 lh-base">This project was born to empower individuals who feel they have all the right pieces but don't yet dare to assemble the puzzle. We bridge the gap between potential and action. Through structured guidance, hands-on mentorship, and supportive resources, we provide the ultimate blueprint you need to confidently connect your skills and finally build your own big picture.</p>
                                </div>
                                <div>
                                    <h5 className="fw-bold text-dark mb-2">Who is in our minds?</h5>
                                    <p className="text-muted small m-0 lh-base">This platform is designed for ambitious learners, career changers, and aspiring professionals who possess raw talent but lack direction. Whether you are a student taking your first steps or a worker looking to upscale, we cater to anyone ready to transform scattered knowledge into structured success. If you have the drive, this space is built entirely for you.</p>
                                </div>
                                <div>
                                    <h5 className="fw-bold text-dark mb-2">A Journey to a better self</h5>
                                    <p className="text-muted small m-0 lh-base">Ultimately, true growth is not just about gaining technical skills; it is about self-discovery and transformation. This platform serves as your launchpad, guiding you every single step of the way. By connecting your scattered pieces with discipline, you are not just completing a puzzle—you are actively shaping your potential and building a much brighter, better version of yourself.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-4">
                <div className="row">
                    <div className="col-12 col-lg-8 offset-lg-2">
                        <div className="rounded-4 py-5 px-4 text-white text-center shadow-sm" style={{ backgroundColor: "#FF1744" }}>
                            <div className="row g-4 justify-content-center">
                                <div className="col-6 col-md-3 d-flex flex-column align-items-center gap-1">
                                    <span className="fs-2 mb-1">👤</span>
                                    <h3 className="display-5 fw-black m-0">50</h3>
                                    <p className="small m-0 text-white-50 fw-semibold text-uppercase" style={{ letterSpacing: "0.5px" }}>MENTORS</p>
                                </div>
                                <div className="col-6 col-md-3 d-flex flex-column align-items-center gap-1">
                                    <span className="fs-2 mb-1">📋</span>
                                    <h3 className="display-5 fw-black m-0">1754</h3>
                                    <p className="small m-0 text-white-50 fw-semibold text-uppercase" style={{ letterSpacing: "0.5px" }}>Total services</p>
                                </div>
                                <div className="col-6 col-md-3 d-flex flex-column align-items-center gap-1">
                                    <span className="fs-2 mb-1">💬</span>
                                    <h3 className="display-5 fw-black m-0">8190</h3>
                                    <p className="small m-0 text-white-50 fw-semibold text-uppercase" style={{ letterSpacing: "0.5px" }}>Happy Clients</p>
                                </div>
                                <div className="col-6 col-md-3 d-flex flex-column align-items-center gap-1">
                                    <span className="fs-2 mb-1">⚡</span>
                                    <h3 className="display-5 fw-black m-0">654</h3>
                                    <p className="small m-0 text-white-50 fw-semibold text-uppercase" style={{ letterSpacing: "0.5px" }}>Creative Events</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

