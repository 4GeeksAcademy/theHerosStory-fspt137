import React from "react";

export const Footer = () => {
	return (
		<footer className="w-100 text-white py-5 px-3 px-md-5 font-sans-serif" style={{ backgroundColor: "#0F1319" }}>
			<div className="container-fluid">
				<div className="row text-start g-4">

					{/* 1. COLUMNA: CONTACT US */}
					<div className="col-lg-3 col-md-6 d-flex flex-column gap-3">
						<h5 className="fw-bold m-0 fs-5 text-white">Contact Us</h5>
						<ul className="list-unstyled d-flex flex-column gap-2 m-0 p-0 text-secondary small">
							<li className="d-flex align-items-start gap-2">
								<i className="fa-solid fa-location-dot text-white opacity-75 mt-1"></i>
								<span>Calle de Edison, 3, Edificio Glue Work, 28006 Madrid, España</span>
							</li>
							<li className="d-flex align-items-center gap-2">
								<i className="fa-solid fa-phone text-white opacity-75"></i>
								<span>+34 000 000 000</span>
							</li>
							<li className="d-flex align-items-center gap-2">
								<i className="fa-solid fa-envelope text-white opacity-75"></i>
								<span>hello@theherosstory.com</span>
							</li>
						</ul>

						{/* Iconos de Redes Sociales */}
						<div className="d-flex gap-2 mt-2">
							<a href="#" className="bg-white text-dark d-flex align-items-center justify-content-center rounded-1 text-decoration-none" style={{ width: "32px", height: "32px" }}>
								<i className="fa-brands fa-facebook-f small"></i>
							</a>
							<a href="#" className="bg-white text-dark d-flex align-items-center justify-content-center rounded-1 text-decoration-none" style={{ width: "32px", height: "32px" }}>
								<i className="fa-brands fa-twitter small"></i>
							</a>
							<a href="#" className="bg-white text-dark d-flex align-items-center justify-content-center rounded-1 text-decoration-none" style={{ width: "32px", height: "32px" }}>
								<i className="fa-brands fa-instagram small"></i>
							</a>
							<a href="#" className="bg-white text-dark d-flex align-items-center justify-content-center rounded-1 text-decoration-none" style={{ width: "32px", height: "32px" }}>
								<i className="fa-brands fa-linkedin-in small"></i>
							</a>
							<a href="#" className="bg-white text-dark d-flex align-items-center justify-content-center rounded-1 text-decoration-none" style={{ width: "32px", height: "32px" }}>
								<i className="fa-brands fa-pinterest-p small"></i>
							</a>
						</div>
					</div>

					{/* 2. COLUMNA: SUPPORT */}
					<div className="col-lg-2 col-md-6 d-flex flex-column gap-3">
						<h5 className="fw-bold m-0 fs-5 text-white">Support</h5>
						<ul className="list-unstyled d-flex flex-column gap-2 m-0 p-0 text-secondary small">
							<li><a href="#" className="text-secondary text-decoration-none hover-light">Privacy</a></li>
							<li><a href="#" className="text-secondary text-decoration-none hover-light">FAQ's</a></li>
							<li><a href="#" className="text-secondary text-decoration-none hover-light">Support</a></li>
							<li><a href="#" className="text-secondary text-decoration-none hover-light">Terms</a></li>
							<li><a href="#" className="text-secondary text-decoration-none hover-light">Condition</a></li>
							<li><a href="#" className="text-secondary text-decoration-none hover-light">Policy</a></li>
						</ul>
					</div>

					{/* 3. COLUMNA: USEFUL LINK */}
					<div className="col-lg-2 col-md-6 d-flex flex-column gap-3">
						<h5 className="fw-bold m-0 fs-5 text-white">Useful Link</h5>
						<ul className="list-unstyled d-flex flex-column gap-2 m-0 p-0 text-secondary small">
							<li><a href="#" className="text-secondary text-decoration-none hover-light">Web Design</a></li>
							<li><a href="#" className="text-secondary text-decoration-none hover-light">UI/UX Design</a></li>
							<li><a href="#" className="text-secondary text-decoration-none hover-light">WP Development</a></li>
							<li><a href="#" className="text-secondary text-decoration-none hover-light">App</a></li>
							<li><a href="#" className="text-secondary text-decoration-none hover-light">Whitepaper</a></li>
							<li><a href="#" className="text-secondary text-decoration-none hover-light">Web Development</a></li>
						</ul>
					</div>

					{/* 4. COLUMNA: NEWSLETTER */}
					<div className="col-lg-5 col-md-6 d-flex flex-column gap-3">
						<h5 className="fw-bold m-0 fs-5 text-white">Newsletter</h5>
						<p className="text-secondary small m-0 lh-base">To get the latest news and latest updates from us.</p>

						<div className="d-flex flex-column gap-3 mt-1">
							<div className="w-100">
								<label className="text-secondary small fw-semibold mb-2 d-block text-start">Your e-mail address:</label>
								<input
									type="email"
									className="form-control bg-transparent text-white border-secondary rounded-0 py-2 small shadow-none"
									placeholder="Enter your email"
									style={{ borderColor: "rgba(255,255,255,0.2)" }}
								/>
							</div>

							{/* Botón de suscripción rojo principal */}
							<button className="btn w-100 text-white fw-bold py-2 rounded-1 border-0" type="button" style={{ backgroundColor: "#FF1744" }}>
								Subscribe
							</button>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
