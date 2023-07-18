import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSignOut = () => {
      // Clear any user authentication-related data (e.g., tokens, user ID) from local storage or session storage
      localStorage.removeItem("userId"); // Example: Remove the user ID from localStorage

      // Redirect the user to the login page or any other desired page
      navigate("/");
    };

    handleSignOut(); // Call the sign-out function immediately
  }, [navigate]);

  return null;
};

export default SignOut;
