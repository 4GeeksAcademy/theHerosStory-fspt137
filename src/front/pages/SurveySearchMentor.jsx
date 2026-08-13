import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SurveySearchMentor = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("");

    const questions = [
        {
            title: "what is your main goal?",
            options: [
                { label: "Career growth", value: "career" },
                { label: "Personal development", value: "personal-development" },
                { label: "Productivity", value: "productivity" },
                { label: "Finance", value: "finance" },
                { label: "Habits", value: "habits" }
            ]
        },
        {
            title: "what kind of support are you looking for?",
            options: [
                { label: "Guidance", value: "guidance" },
                { label: "Motivation", value: "motivation" },
                { label: "Planning", value: "planningy" },
                { label: "Accountability", value: "accountability" },
            ]
        },
        {
            title: "How often would you like support?",
            options: [
                { label: "Daily", value: "daily" },
                { label: "Weekly", value: "weekly" },
                { label: "Occasionally", value: "occasionallyy" },
            ]
        }
    ];

    const currentQuestion = questions[step];

    const handleSelect = (value) => {
        const newAnswers = {
            ...answers,
            [step]: value
        };

        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            const category = newAnswers[0];

            console.log("Survey completed");
            console.log("Answers:", newAnswers);
            console.log("Category:", category);

            navigate(`/user-mentors?category=${category}`);
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        } else {
            navigate(-1);
        }
    };

    const progress = ((step + 1) / questions.length) * 100;

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-7">
                    <div className="mb-4">
                        <p className="text-muted mb-2">
                            Question {step + 1} of {questions.length}
                        </p>
                        <div className="progress">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${progress}%` }}
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                            </div>
                        </div>
                        <div className="card shadow-sm">
                            <div className="card-body p-4">

                                <h2 className="mb-4">
                                    {currentQuestion.title}
                                </h2>

                                <div className="row g-3">
                                    {currentQuestion.options.map((option) => (
                                        <div className="col-12 col-md-6" key={option.value}>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary w-100 p-4"
                                                onClick={() => handleSelect(option.value)}
                                            >
                                                {option.label}
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={handleBack}
                                    >
                                        Back
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};