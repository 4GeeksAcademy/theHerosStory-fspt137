import React from "react";
import marianelaImg from "../assets/img/IMG_20260204_094802.jpg";
import marioImg from "../assets/img/IMG-20260816-WA0101.jpg";
import adrianImg from "../assets/img/1000109682.jpg";
import linkedInSvg from "../assets/img/linkedin-svgrepo-com.svg";
import gitHubSvg from "../assets/img/github-svgrepo-com.svg";

export const TeamView = () => {
	const developers = [
		{
			name: "Marianela Curto",
			role: "Full Stack Developer",
			bio: "Strategic professional with 10+ years of experience in advertising and finance, now pivoting to Full Stack development. She blends strong analytical and business skills with coding to build impactful digital solutions, offering a unique hybrid vision that bridges business strategy and tech.",
			image: marianelaImg,
			githubUrl: "https://github.com",   // 🔗 Rellena aquí tus enlaces definitivos
			linkedinUrl: "https://linkedin.com"
		},
		{
			name: "Mario Díaz",
			role: "Full Stack Developer",
			bio: "Dedicated professional with a background in video game development and 3D art, now pivoting to web development. He blends his artistic vision and musical background with programming to craft highly satisfying digital environments, adding a unique, personal, and expressive touch to interactive web experiences.",
			image: marioImg,
			githubUrl: "https://github.com",
			linkedinUrl: "https://linkedin.com"
		},
		{
			name: "Adrián Aranda",
			role: "Full Stack Developer",
			bio: "Resilient professional with a technical background in electromechanics, now training in software development. Motivated by personal growth and the digital shift, he adapts his problem-solving skills to technology, aiming to build sustainable, future-proof digital solutions that align with modern industry demands.",
			image: adrianImg,
			githubUrl: "https://github.com",
			linkedinUrl: "https://linkedin.com"
		}
	];

	return (
		<div className="w-100 py-5 px-3 px-md-5 bg-light" style={{ fontFamily: "'Inter', sans-serif", minHeight: "80vh" }}>
			
			<style>{`
				.team-card {
					transition: transform 0.3s ease, cubic-bezier(0.4, 0, 0.2, 1);
					cursor: pointer;
				}
				/* Modificado: Ahora el hover despliega la bio y el contenedor de redes a la vez */
				.team-grid:hover .team-bio,
				.team-grid:hover .team-socials {
					max-height: 500px; 
					opacity: 1;
					margin-top: 12px !important;
				}
				/* Estado base inicial oculto para ambos bloques */
				.team-bio, .team-socials {
					max-height: 0;
					opacity: 0;
					overflow: hidden;
					transition: max-height 0.5s ease-in-out, opacity 0.4s ease-in-out, margin 0.3s ease;
				}
				/* Efecto sutil de opacidad al pasar el ratón por encima del SVG */
				.social-icon {
					width: 28px;
					height: 28px;
					transition: transform 0.2s ease, filter 0.2s ease;
				}
				.social-icon:hover {
					transform: scale(1.1);
					filter: brightness(1.2); /* Les da un extra de brillo en pantallas oscuras */
				}
			`}</style>

			<div className="container-fluid">
				
				<div className="text-center mb-5">
					<span className="text-danger fw-bold text-uppercase small" style={{ letterSpacing: "1px" }}>Our Devs</span>
					<h2 className="fw-black text-dark display-5 m-0 mt-2" style={{ letterSpacing: "-1px" }}>Meet Our Team</h2>
				</div>

				{/* 🛠️ NUEVA FILA CENTRALIZADORA: Limita el ancho del contenido de tarjetas */}
				<div className="row justify-content-center m-0">
					<div className="col-12 col-lg-10 col-xl-8">
						
						{/* Tu cuadrícula original de tarjetas ahora vive dentro de las 8/10 columnas asignadas */}
						<div className="row g-4 justify-content-center team-grid">
							{developers.map((dev, index) => (
								<div key={index} className="col-lg-4 col-md-6 col-sm-12">
									<div className="card h-100 border-0 rounded-3 shadow-sm text-start team-card" style={{ backgroundColor: "#0F1319" }}>
										
										<div className="w-100 position-relative rounded-top-3" style={{ paddingBottom: "100%", overflow: "hidden" }}>
											<img 
												src={dev.image} 
												alt={dev.name} 
												className="position-absolute top-0 start-0 w-100 h-100 rounded-top-3"
												style={{ objectFit: "cover", objectPosition: "center" }}
											/>
										</div>

										<div className="card-body p-4 text-white d-flex flex-column gap-1">
											<h4 className="fw-bold m-0 fs-5">{dev.name}</h4>
											<span className="text-danger small fw-semibold text-uppercase m-0" style={{ letterSpacing: "0.5px" }}>
												{dev.role}
											</span>
											
											{/* Enlaces utilizando tus SVGs importados */}
											<div className="d-flex gap-3 team-socials m-0">
												<a href={dev.githubUrl} target="_blank" rel="noopener noreferrer">
													<img 
														src={gitHubSvg} 
														alt="GitHub" 
														className="social-icon" 
													/>
												</a>
												<a href={dev.linkedinUrl} target="_blank" rel="noopener noreferrer">
													<img 
														src={linkedInSvg} 
														alt="LinkedIn" 
														className="social-icon" 
													/>
												</a>
											</div>
											
											<p className="text-white small m-0 lh-base team-bio" style={{ color: "#a0aec0" }}>
												{dev.bio}
											</p>
										</div>

									</div>
								</div>
							))}
						</div>

					</div>
				</div>

			</div>
		</div>
	);
};
