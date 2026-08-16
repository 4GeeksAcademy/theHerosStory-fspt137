import React from "react";
import { Link } from "react-router-dom";

export const AboutUsView = () => {
    return (
        <div className="about-us-page bg-white w-100" style={{ fontFamily: "'Inter', sans-serif" }}>

            {/* 1. HERO BANNER / BREADCRUMB */}
            <div
                className="about-hero-banner py-5 px-3 px-md-5 d-flex align-items-center text-white"
                style={{
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://www.olympion-sunset.com/cache/com_zoo/images/ZON6936_4c0828c94247c5be5011d1d4be0c5533.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "220px"
                }}
            >
                <div className="container-fluid text-start">
                    <h1 className="display-4 fw-bold m-0" style={{ letterSpacing: "-1px" }}>About Us</h1>
                </div>
            </div>


            {/* 2. SECCIÓN PRINCIPAL: APRENDE NUEVAS HABILIDADES */}
            <div className="container-fluid py-5 px-3 px-md-5 mt-4">
                <div className="row align-items-start font-sans-serif">

                    {/* Columna Izquierda: Composición de imágenes */}
                    <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
                        <div className="position-relative pe-3 pb-3">
                            {/* Imagen principal trasera */}
                            <img
                                src="https://img.magnific.com/vector-premium/ilustracion-concepto-estudiante-feliz_114360-8328.jpg?semt=ais_test_b&w=740&q=80"
                                alt="Students working"
                                className="img-fluid rounded shadow-sm w-100"
                            />
                        </div>
                    </div>

                    {/* Columna Derecha: Textos e Items */}
                    <div className="col-lg-6 col-md-12 ps-lg-5 text-start d-flex flex-column gap-3">
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia laborum.
                        </p>

                        {/* Elemento de lista verde superior */}
                        <div className="d-flex align-items-start gap-3 mt-2">
                            <span className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center p-1" style={{ width: "24px", height: "24px", fontSize: "12px" }}>
                                ✓
                            </span>
                            <div>
                                <h6 className="fw-bold text-dark mb-1">A place where you can achieve</h6>
                                <p className="text-muted small m-0">Education encompasses both the teaching and learning of knowledge, proper conduct, and technical competency.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. SECCIÓN DE 3 COLUMNAS (CARACTERÍSTICAS) */}
            <div className="container-fluid py-5 px-3 px-md-5 bg-light border-top border-bottom">
                <div className="row text-start g-4">

                    {/* Columna 1 */}
                    <div className="col-md-4 d-flex flex-column gap-3">
                        <h4 className="fw-bold text-dark m-0 fs-5">100,000 services</h4>
                        <p className="text-muted small m-0">Real innovations and a positive customer experience are the heart of successful communication.</p>
                        <ul className="list-unstyled d-flex flex-column gap-2 small text-muted p-0 m-0">
                            <li><span className="text-secondary me-2">✓</span> Activate Listening</li>
                            <li><span className="text-secondary me-2">✓</span> Brilliant minds</li>
                            <li><span className="text-secondary me-2">✓</span> Better. Best. Wow!</li>
                            <li><span className="text-secondary me-2">✓</span> Branding it better!</li>
                        </ul>
                    </div>

                    {/* Columna 2 */}
                    <div className="col-md-4 d-flex flex-column gap-3">
                        <h4 className="fw-bold text-dark m-0 fs-5">Mentor instruction</h4>
                        <p className="text-muted small m-0">Real innovations and a positive customer experience are the heart of successful communication.</p>
                        <ul className="list-unstyled d-flex flex-column gap-2 small text-muted p-0 m-0">
                            <li><span className="text-secondary me-2">✓</span> Creating. Results.</li>
                            <li><span className="text-secondary me-2">✓</span> Expect more</li>
                            <li><span className="text-secondary me-2">✓</span> Good thinking</li>
                            <li><span className="text-secondary me-2">✓</span> In real we trust</li>
                        </ul>
                    </div>

                    {/* Columna 3 */}
                    <div className="col-md-4 d-flex flex-column gap-3">
                        <h4 className="fw-bold text-dark m-0 fs-5">Lifetime access</h4>
                        <p className="text-muted small m-0">Real innovations and a positive customer experience are the heart of successful communication.</p>
                        <ul className="list-unstyled d-flex flex-column gap-2 small text-muted p-0 m-0">
                            <li><span className="text-secondary me-2">✓</span> Stay real. Always.</li>
                            <li><span className="text-secondary me-2">✓</span> We have you covered</li>
                            <li><span className="text-secondary me-2">✓</span> We turn heads</li>
                            <li><span className="text-secondary me-2">✓</span> Your brand, promoted</li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* 4. SECCIÓN ASIMÉTRICA: OUR STORY */}
            <div className="container-fluid py-5 px-3 px-md-5 mt-3">
                <div className="row text-start align-items-start">
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <h2 className="display-6 fw-black text-dark m-0" style={{ letterSpacing: "-1px" }}>Our Story</h2>
                    </div>
                    <div className="col-lg-9 col-md-12 d-flex flex-column gap-4">
                        <div>
                            <h5 className="fw-bold text-dark mb-2">A better future starts here</h5>
                            <p className="text-muted small m-0 lh-base">Website.com began in 2005. After years in the web hosting industry, we realized that it was near impossible for the average Jane or Joe to create their own website. Traditional web hosting services were simply too complicated, time consuming, and expensive to manage.</p>
                        </div>
                        <div>
                            <h5 className="fw-bold text-dark mb-2">A Classical Education for the Future</h5>
                            <p className="text-muted small m-0 lh-base">We created the Website.com Site Builder with the user's perspective in mind. We wanted to offer a platform that would require no coding skills or design experience. We keep it simple, so users can focus on creating an amazing website that reflects their brand. Best of all - it's free. You can get online, showcase your brand, or start selling products right away.</p>
                        </div>
                        <div>
                            <h5 className="fw-bold text-dark mb-2">A Journey to Excellence</h5>
                            <p className="text-muted small m-0 lh-base">After seeing an increased need for eCommerce solutions, we developed one of the only fully-featured, free and commission-free online store builders, allowing business owners to launch their online business.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. BANNER ROJO DE ESTADÍSTICAS */}
            <div className="container-fluid px-3 px-md-5 my-4">
                <div className="rounded-4 py-5 px-4 text-white text-center shadow-sm" style={{ backgroundColor: "#FF1744" }}>
                    <div className="row g-4 justify-content-center">
                        {/* Item 1 */}
                        <div className="col-6 col-md-3 d-flex flex-column align-items-center gap-1">
                            <span className="fs-2 mb-1">👤</span>
                            <h3 className="display-5 fw-black m-0">50</h3>
                            <p className="small m-0 text-white-50 fw-semibold text-uppercase" style={{ letterSpacing: "0.5px" }}>Expert Instructors</p>
                        </div>
                        {/* Item 2 */}
                        <div className="col-6 col-md-3 d-flex flex-column align-items-center gap-1">
                            <span className="fs-2 mb-1">📋</span>
                            <h3 className="display-5 fw-black m-0">1754</h3>
                            <p className="small m-0 text-white-50 fw-semibold text-uppercase" style={{ letterSpacing: "0.5px" }}>Total Courses</p>
                        </div>
                        {/* Item 3 */}
                        <div className="col-6 col-md-3 d-flex flex-column align-items-center gap-1">
                            <span className="fs-2 mb-1">💬</span>
                            <h3 className="display-5 fw-black m-0">8190</h3>
                            <p className="small m-0 text-white-50 fw-semibold text-uppercase" style={{ letterSpacing: "0.5px" }}>Happy Students</p>
                        </div>
                        {/* Item 4 */}
                        <div className="col-6 col-md-3 d-flex flex-column align-items-center gap-1">
                            <span className="fs-2 mb-1">⚡</span>
                            <h3 className="display-5 fw-black m-0">654</h3>
                            <p className="small m-0 text-white-50 fw-semibold text-uppercase" style={{ letterSpacing: "0.5px" }}>Creative Events</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

