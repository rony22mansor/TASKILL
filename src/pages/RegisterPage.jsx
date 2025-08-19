import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    // Here you would make an API call to register the user

    try {
      // --- FAKE API CALL ---
      const fakeApiCall = new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 1000);
      });

      await fakeApiCall;

      // 1. Show a success toast
      toast.success("Account created successfully! Please log in.");

      // 2. Navigate to the login page
      navigate("/login");
    } catch (e) {
      toast.error(`Registration failed. Please try again. ${e}`);
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleRegister}>
        {/* Your registration form fields go here */}
        <button type="submit">Create Account</button>
      </form>
      <Link to="/login">Already have an account? Sign In</Link>
    </div>
  );
};

export default RegisterPage;
