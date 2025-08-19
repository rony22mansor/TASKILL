import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField, Button, Box, Link } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// --- A minimal dark theme for MUI components ---
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#a855f7", // Purple-500
    },
    background: {
      paper: "#1f2937", // Gray-800
      default: "#111827", // Gray-900
    },
  },
});

// --- Image Assets ---
const images = [
  "https://placehold.co/800x600/1e1e1e/f0f0f0?text=Feature+1",
  "https://placehold.co/800x600/2d2d2d/e0e0e0?text=Dashboard+View",
  "https://placehold.co/800x600/3c3c3c/d0d0d0?text=AI+Analytics",
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const fakeApiCall = new Promise((resolve) =>
        resolve({ token: "fake-auth-token-123" })
      );
      const response = await fakeApiCall;
      localStorage.setItem("authToken", response.token);
      toast.success("Login successful!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="min-h-screen bg-gray-900 text-white flex w-full">
        {/* Left Section: The Form (Tailwind layout) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <header className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-3">Welcome Back</h1>
              <p className="text-gray-400 text-lg">
                The AI for problem solvers
              </p>
            </header>

            <Box component="form" onSubmit={handleLogin} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                placeholder="you@company.com"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="••••••••"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "600",
                  backgroundColor: "#9333ea",
                  "&:hover": { backgroundColor: "#7e22ce" },
                }}
              >
                Continue with Email
              </Button>
            </Box>

            <p className="text-center text-gray-500 mt-8">
              Don't have an account?{" "}
              <Link
                component={RouterLink}
                to="/register"
                className="font-medium text-purple-400 hover:text-purple-300"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section: Fading Images (Tailwind layout) */}
        <div className="hidden lg:flex w-1/2 bg-gray-800 items-center justify-center p-8 relative overflow-hidden">
          <div className="w-full h-full max-w-3xl max-h-3xl relative">
            {images.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Feature demonstration ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover rounded-2xl transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LoginPage;
