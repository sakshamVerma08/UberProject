import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { toast } from "react-hot-toast";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    const newUser = {
      fullname: {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
      },
      email: email.trim(),
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("user_token", data.token);
        toast.success("Account created successfully!");
        navigate("/home");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong. Please try again";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left: Signup Form */}
      <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <img
              className="w-auto h-10 mb-4"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Uber Logo"
            />
            <h1 className="text-3xl font-bold text-gray-900">
              Create an account
            </h1>
            <p className="mt-2 text-gray-600">
              Sign up to get started with your ride
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First name
                </label>
                <input
                  id="firstname"
                  type="text"
                  required
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  placeholder="John"
                />
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last name
                </label>
                <input
                  id="lastname"
                  type="text"
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                placeholder="Create a password"
              />
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 6 characters long
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200 ${
                  isLoading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By proceeding, you agree to our Terms of Service and confirm you
              have read our Privacy Policy. This site is protected by reCAPTCHA
              and the Google{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1554260570-83dc2f46ef79?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="relative h-full flex items-center p-12">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to ride?</h2>
            <p className="text-lg mb-6">
              Join millions of riders who choose Uber for their daily commute
              and travel needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
