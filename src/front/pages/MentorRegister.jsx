import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const MentorRegister = () => {
    const [mentorname, setMentorname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState(""); 
    const [tag, setTag] = useState("");           
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const categoryOptions = [
        "Mental Health & Wellbeing", "Fitness & Exercise", "Nutrition & Dietetics", 
        "Personal Development", "Spirituality & Meditation", "Relationships & Family",
        "Productivity & Routines", "Time Management", "Personal Finance",
        "Fashion & Style", "Beauty & Skincare", "Interior Design & Decor",
        "Minimalism & Decluttering", "Travel & Nomadism", "Gastronomy & Cooking",
        "Sustainability & Eco-living", "Gardening & Plants", "Pet Care",
        "Leisure & Entertainment", "Lifestyle Photography", "Reading & Writing",
        "Motherhood & Fatherhood", "Healthy Aging", "Arts & Crafts (DIY)",
        "Coffee & Mixology", "Rural Tourism & Adventure", "Workplace Wellness",
        "Sleep & Rest Optimization", "Habit Breaking & Building", "Senior Lifestyle"
    ]

    const tagOptions = [
        "Yoga", "Mindfulness", "Pilates", "Calisthenics", "Vegan / Vegetarian",
        "Real Fooding", "Intermittent Fasting", "CrossFit", "Guided Meditation", "Journaling",
        "Self-Love", "Emotional Intelligence", "Morning Routine", "Toxic Productivity", "Gentle Parenting",
        "Budget Travel", "Hiking & Trekking", "Batch Cooking", "Natural Cosmetics", "Capsule Wardrobe",
        "Zero Waste", "Passive Investing", "Home Organization", "Life Coaching", "Resilience",
        "Stoicism", "Stress Management", "Urban Gardening", "Dog Training", "Speed Reading"
    ]

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        fetch(`${backendUrl}/api/mentors`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                mentorname,
                email,
                password,
                category, 
                tag       
            })
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.msg || "Error creating mentor");
                }

                return data;
            })
            .then((data) => {
                console.log("Mentor created:", data);
                navigate("/mentors/login");
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <h1 className="mb-4 text-center">Mentor Register</h1>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="mentorname" className="form-label">
                                Mentor name
                            </label>
                            <input
                                id="mentorname"
                                type="text"
                                className="form-control"
                                value={mentorname}
                                onChange={(event) => setMentorname(event.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Category
                            </label>
                            <select
                                id="category"
                                className="form-select"
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                {categoryOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">
                                Tag
                            </label>
                            <select
                                id="tag"
                                className="form-select"
                                value={tag}
                                onChange={(event) => setTag(event.target.value)}
                                required
                            >
                                <option value="" disabled>Select a tag</option>
                                {tagOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Register"}
                        </button>
                    </form>

                    <p className="text-center mt-3">
                        Already have an account?{" "}
                        <Link to="/mentors/login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
