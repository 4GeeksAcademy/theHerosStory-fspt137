import React from "react";
import marianelaImg from "../assets/img/IMG_20260204_094802.jpg";
import marioImg from "../assets/img/IMG-20260816-WA0101.jpg";
import adrianImg from "../assets/img/1000109682.jpg";

export const TeamView = () => {
	const developers = [
		{
			name: "Marianela Curto",
			role: "Full Stack Developer",
			bio: "Marianela is a professional with over 10 years of experience in strategic advertising planning, working with fast-moving consumer goods (FMCG) brands, the financial sector, banking, and payment methods.Throughout her career, she has developed strong analytical skills, a deep understanding of business, and a clear focus on results, collaborating with multidisciplinary teams and managing high-impact campaigns.She is currently pivoting toward the tech world, training as a Full Stack Developer, where she is acquiring skills in web development, programming logic, and application building.Her goal is to combine her business and marketing expertise with technology to create digital solutions that generate real value for users and companies alike.She is particularly interested in opportunities where she can contribute this hybrid vision bridging business and development.",
			image: marianelaImg
		},
		{
			name: "Mario Díaz",
			role: "Full Stack Developer",
			bio: "Mario is a dedicated professional who studied video game development and works as a 3D artist. On a personal level, he is a passionate traditional artist and musician, elements that naturally enrich his creative vision. He recently decided to pivot his career toward web development to seamlessly blend his artistic background with programming. A remarkably hardworking individual, Mario’s ultimate mission in the tech world is simply to craft highly satisfying digital environments infused with a genuine, personal touch, making interactive web experiences uniquely expressive.",
			image: marioImg
		},
		{
			name: "Adrián Aranda",
			role: "Full Stack Developer",
			bio: "Adrián pivoted his career path following specific health challenges, specifically epilepsy, which motivated him to pursue a profession that better aligned with his well-being and personal needs. Originally trained in electromerchanics, he recognized the inevitable shift toward digital industries and chose to embrace technology as the definitive future. Now training in software development, his goal is to adapt to modern demands and secure a sustainable, resilient career where he can apply his technical background to build future-proof digital solutions.",
			image: adrianImg
		}
	];

	return (
		<div className="w-100 py-5 px-3 px-md-5 bg-light" style={{ fontFamily: "'Inter', sans-serif", minHeight: "80vh" }}>
			<div className="container-fluid">
				
				<div className="text-center mb-5">
					<span className="text-danger fw-bold text-uppercase small" style={{ letterSpacing: "1px" }}>Our Devs</span>
					<h2 className="fw-black text-dark display-5 m-0 mt-2" style={{ letterSpacing: "-1px" }}>Meet Our Team</h2>
				</div>

				<div className="row g-4 justify-content-center">
					{developers.map((dev, index) => (
						<div key={index} className="col-lg-4 col-md-6 col-sm-12">
							<div className="card h-100 border-0 rounded-3 shadow-sm text-start" style={{ backgroundColor: "#0F1319" }}>
								
								<div className="w-100 position-relative" style={{ paddingBottom: "100%", overflow: "hidden" }}>
									<img 
										src={dev.image} 
										alt={dev.name} 
										className="position-absolute top-0 start-0 w-100 h-100"
										style={{ objectFit: "cover", objectPosition: "center" }}
									/>
								</div>

								<div className="card-body p-4 text-white d-flex flex-column gap-2">
									<h4 className="fw-bold m-0 fs-5">{dev.name}</h4>
									<span className="text-danger small fw-semibold text-uppercase m-0" style={{ letterSpacing: "0.5px" }}>
										{dev.role}
									</span>
									<p className="text-secondary small m-0 lh-base" style={{ color: "#a0aec0" }}>
										{dev.bio}
									</p>
								</div>

							</div>
						</div>
					))}
				</div>

			</div>
		</div>
	);
};
