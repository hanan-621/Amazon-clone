import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);

      const safeUser={
        id: data.user._id,
        name:data.user.name,
        email:data.user.email,
        role:data.user.role,
      };
      
      localStorage.setItem("user", JSON.stringify(safeUser));

      setSuccess("Login successful!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white border rounded-lg p-6 shadow-sm">

        <h1 className="text-3xl font-semibold mb-6">
          Sign in
        </h1>

        {error && (
          <div className="mb-4 border border-red-400 bg-red-50 text-red-700 p-3 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 border border-green-400 bg-green-50 text-green-700 p-3 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 font-semibold"
          >
            Sign in
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          New to Amazon Clone?
        </p>

        <Link
          to="/register"
          className="block text-center mt-3 py-2 border rounded-md hover:bg-gray-100"
        >
          Create your account
        </Link>

      </div>
    </div>
  );
};

export default Login;
