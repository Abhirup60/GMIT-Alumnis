import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../stores/Auth";

const AdminLogin = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Dummy authentication
    console.log(details);
    try {
      const response = await fetch("http://localhost:3000/api/auth/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      console.log(response);
      if (response.ok) {
        const res_data = await response.json();
        console.log("from login admin: ", res_data);

        storeTokenInLS(res_data.token);

        toast.success("Admin Login Successfully");
        setDetails({ email: "", password: "" });
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96 transform transition-all hover:shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#1a2a5e]">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f36f21] focus:border-transparent"
              name="email"
              value={details.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f36f21] focus:border-transparent"
              name="password"
              value={details.password}
              onChange={handleInput}
              required
            />
          </div>
          <button
            className="w-full bg-[#1a2a5e] text-white p-3 rounded-lg hover:bg-[#0e1a3a] transition-colors font-semibold"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/admin/signup" className="text-[#f36f21] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;