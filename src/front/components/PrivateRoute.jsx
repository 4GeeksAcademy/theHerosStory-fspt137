import React, { Children } from "react";
import { Navigate, redirect } from "react-router-dom";

export const PrivateRoute = ({
    children,
    tokenName,
    redirectTo
}) => {
    const token = localStorage.getItem(tokenName);

    if(!token) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};