import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../stores/Auth";

const AdminSignup = () => {
  const [details, setDetails] = useState({
    username: "",
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

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(details);
    try {
      const response = await fetch("http://localhost:3000/api/auth/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      console.log(response);
      if (response.ok) {
        const res_data = await response.json();
        
        console.log("from admin registration: ", res_data);

        storeTokenInLS(res_data.token);

        toast.success("Admin Registered Successfully");
        setDetails({ username: "", email: "", password: "" });
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96 transform transition-all hover:shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#1a2a5e]">Admin Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f36f21] focus:border-transparent"
              name="username"
              value={details.username}
              onChange={handleInput}
              required
            />
          </div>
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
            Signup
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-[#f36f21] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;