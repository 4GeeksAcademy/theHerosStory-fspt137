import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MatchMentor = () => {
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [matched, setMatched] = useState(false);
    const navigate = useNavigate();

    const goals = [
        "Estudio y Concentración",
        "Gimnasio y Fuerza",
        "Control Emocional",
        "Productividad Diaria",
        "Hábitos de Lectura",
        "Dieta y Nutrición",
        "Meditación y Mindfulness",
        "Programación y Código",
        "Gestión Financiera",
        "Descanso y Sueño"
    ];

    const handleCheckboxChange = (goal) => {
        if (selectedGoals.includes(goal)) {
            setSelectedGoals(selectedGoals.filter(g => g !== goal));
        } else {
            setSelectedGoals([...selectedGoals, goal]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedGoals.length === 0) {
            alert("Por favor, selecciona al menos un objetivo.");
            return;
        }
        setMatched(true);
    };

    return (
        <div className="container my-5 flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="row shadow-lg rounded-4 bg-white overflow-hidden p-0 w-100" style={{ maxWidth: "900px", minHeight: "500px" }}>

                {/* Izquierda: Contenido / Formulario o Resultado */}
                <div className="col-md-7 p-5 d-flex flex-column justify-content-center">
                    {!matched ? (
                        <>
                            <div className="mb-4">
                                <h3 className="fw-bold text-dark">MatchMentor Finder</h3>
                                <p className="text-muted small">Selecciona tus objetivos principales para encontrar tu mentor ideal:</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    {goals.map((goal, index) => (
                                        <div className="col-md-6 mb-2" key={index}>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`goal-${index}`}
                                                    value={goal}
                                                    onChange={() => handleCheckboxChange(goal)}
                                                />
                                                <label className="form-check-label text-secondary small" htmlFor={`goal-${index}`}>
                                                    {goal}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn py-2 fw-bold text-white shadow-sm"
                                        style={{ backgroundColor: "#fa4251", border: "none" }}
                                    >
                                        ¡Hacer Match!
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <h3 className="fw-bold text-success mb-3">¡Es un Match! 🎉</h3>
                            <p className="text-muted">Basado en tus elecciones, hemos encontrado al mentor perfecto para ti.</p>
                            <div className="card bg-light border-0 p-3 my-3">
                                <h5 className="fw-bold text-dark mb-1">Carlos Mentor</h5>
                                <p className="text-muted small mb-0">Especialista en hábitos y productividad.</p>
                            </div>
                            <button
                                className="btn btn-dark rounded-pill px-4 mt-2"
                                onClick={() => setMatched(false)}
                            >
                                Buscar de nuevo
                            </button>
                        </div>
                    )}
                </div>

                {/* Derecha: Imagen decorativa */}
                <div className="col-md-5 d-none d-md-block p-0 bg-light">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                        alt="Match mentor background"
                        className="w-100 h-100 object-fit-cover"
                        style={{ minHeight: "450px" }}
                    />
                </div>

            </div>
        </div>
    );
};