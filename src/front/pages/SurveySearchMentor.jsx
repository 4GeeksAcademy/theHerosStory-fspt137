import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPageLayout } from "../components/UserPageLayout";

export const SurveySearchMentor = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("");
    const [scores, setScores] = useState({
        career: 0,
        habits: 0,
        productivity: 0,
        finance: 0,
        "personal-development": 0
    });

    const questions = [
        {
            title: "what is your main goal?",
            options: [
                {
                    label: "Improve my career",
                    scores: { career: 2 }
                },
                {
                    label: "Build better habits my career",
                    scores: { habits: 2 }
                },
                {
                    label: "Be more productive",
                    scores: { productivity: 2 }
                },
                {
                    label: "Improve my finances",
                    scores: { finance: 2 }
                },
                {
                    label: "Grow personally",
                    scores: { "personal-development": 2 }
                }
            ]
        },
        {
            title: "what kind of support do you need?",
            options: [
                {
                    label: "Help planning my next professional step",
                    scores: { career: 1, productivity: 1 }
                },
                {
                    label: "Help staying consistent",
                    scores: { habits: 2 }
                },
                {
                    label: "Help organizing my time",
                    scores: { productivity: 2 }
                },
                {
                    label: "Help managing money",
                    scores: { finance: 2 }
                },
                {
                    label: "Guidance and personal growth",
                    scores: { "personal-development": 2 }
                },
            ]
        },
        {
            title: "What would make the biggest difference for you right now?",
            options: [
                {
                    label: "finding a better job or career direction",
                    scores: { career: 2 }
                },
                {
                    label: "Creating routines I can maintain",
                    scores: { habits: 2 }
                },
                {
                    label: "Getting more done with less stress",
                    scores: { productivity: 2 }
                },
                {
                    label: "Feeling more confident with money",
                    scores: { finance: 2 }
                },
                {
                    label: "Understanding mysef and my goals better",
                    scores: { "personal-development": 2 }
                },
            ]
        }
    ];

    const currentQuestion = questions[step];

    const handleSelect = (option) => {
        const newScores = { ...scores };

        Object.entries(option.scores).forEach(([category, points]) => {
            newScores[category] += points;
        });

        setScores(newScores);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            const recommendedCategory = Object.keys(newScores).reduce(
                (a, b) => newScores[a] > newScores[b] ? a : b
            );

            console.log("Final scores:", newScores);
            console.log("Recommended category:", recommendedCategory);

            navigate(`/user-mentors?category=${recommendedCategory}`);
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
        <UserPageLayout>

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
                                        <div className="col-12 col-md-6" key={option.label}>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary w-100 p-4"
                                                onClick={() => handleSelect(option)}
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
                                        </UserPageLayout>
    );
};