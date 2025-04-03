import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUsers, FiHome, FiBriefcase } from "react-icons/fi";
import { useAuth } from "../stores/Auth";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineLogin } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const Alumni = () => {
  const { isLoggedin, getAlltheAdminUser, adminUser } = useAuth();
  const [showAdminUsers, setShowAdminUsers] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jobPosts, setJobPosts] = useState([
    {
      id: 1,
      jobTitle: "Software Engineer",
      companyName: "Tech Corp",
      location: "San Francisco, CA",
      date: "2023-10-01",
      jobDescription: "We are looking for a skilled software engineer...",
      approved: false,
    },
    {
      id: 2,
      jobTitle: "Product Manager",
      companyName: "Innovate Inc",
      location: "New York, NY",
      date: "2023-10-05",
      jobDescription: "Join our team as a product manager...",
      approved: false,
    },
  ]);
  const [showJobPosts, setShowJobPosts] = useState(false);
  const navigate = useNavigate();
  const passwordPromptShown = useRef(false);

  const staticPassword = "1234";

  // const checkPassword = () => {
  //   if (passwordPromptShown.current) return;
  //   passwordPromptShown.current = true;

  //   const enteredPassword = prompt("Enter the password to access this page:");
  //   if (enteredPassword === staticPassword) {
  //     setIsAuthenticated(true);
  //   } else {
  //     toast.error("Incorrect password. Access denied.");
  //     navigate("/");
  //   }
  // };

  // useEffect(() => {
  //   checkPassword();
  // }, []);

  const handleFetchAdminUsers = () => {
    if (isLoggedin) {
      getAlltheAdminUser();
      toast.warn("You can see the admin details");
      setShowAdminUsers(true);
    } else {
      toast.error("Login first");
    }
  };

  const handleCloseAdminUsers = () => {
    setShowAdminUsers(false);
  };

  const deleteUserbyid = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`http://localhost:3000/api/auth/admin/delete-adminUser/${id}`, {
        method: "DELETE",
        // headers: {
        //   Authorization: authToken,
        // },
      });

      if (response.ok) {
        const res = await response.json();
        console.log("user deleted successfully", res);
        getAlltheAdminUser();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleApproveJob = (id) => {
    setJobPosts((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, approved: true } : job
      )
    );
    toast.success("Job post approved!");
  };

  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-[#1a2a5e] text-white p-6 space-y-6 shadow-lg">
          <h2 className="text-2xl font-bold text-[#f36f21]">Admin Panel</h2>
          <nav className="space-y-4">
            <Link
              to={"/admin"}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f36f21] hover:text-white transition"
            >
              <FiHome className="text-lg" /> Dashboard
            </Link>
            <Link
              to={"/admin/alumnis"}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f36f21] hover:text-white transition"
            >
              <FiUsers className="text-lg" /> Alumnis
            </Link>
            {/* <button
              onClick={() => setShowJobPosts(!showJobPosts)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f36f21] hover:text-white transition w-full"
            >
              <FiBriefcase className="text-lg" /> Approve Job Posts
            </button> */}
            {isLoggedin ? (
              <Link
                to={"/admin/logout"}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f36f21]
                 hover:text-white transition"
              >
                <BiLogOut className="text-lg" /> Logout
              </Link>
            ) : (
              <>
                <Link
                  to={"/admin/signup"}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f36f21]
                   hover:text-white transition"
                >
                  <GrUserAdmin className="text-lg" /> Sign up
                </Link>
                <Link
                  to={"/admin/login"}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f36f21]
                   hover:text-white transition"
                >
                  <MdOutlineLogin className="text-lg" /> Login
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gradient-to-br from-[#f5f5f5] to-[#e0e0e0] text-gray-900">
          <h1 className="text-3xl font-bold text-[#1a2a5e] mb-6">Admin Users</h1>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleFetchAdminUsers}
              className="px-6 py-2 bg-[#1a2a5e] text-white rounded-lg hover:bg-[#0e1a3a]
               transition flex items-center gap-2"
            >
              <FiUsers className="text-lg" /> Show Admin Users
            </button>
            <button
              onClick={handleCloseAdminUsers}
              className="px-6 py-2 bg-[#f36f21] text-white rounded-lg hover:bg-[#e65a1a]
               transition flex items-center gap-2"
            >
              <BiLogOut className="text-lg" /> Close
            </button>
          </div>

          {/* Admin Users List */}
          {showAdminUsers && (
            <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold text-[#1a2a5e] mb-4">
                Total Admin Users: {adminUser.length}
              </h2>
              <ul className="space-y-3">
                {adminUser.map((user, index) => (
                  <li
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#f36f21] rounded-full flex items-center justify-center text-white font-bold">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1a2a5e]">{user.username}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => deleteUserbyid(user._id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Approve Job Posts Section */}
          {showJobPosts && (
            <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold text-[#1a2a5e] mb-4">
                Pending Job Posts
              </h2>
              <ul className="space-y-3">
                {jobPosts
                  .filter((job) => !job.approved)
                  .map((job) => (
                    <li
                      key={job.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-[#1a2a5e]">
                            {job.jobTitle}
                          </h3>
                          <p className="text-sm text-gray-600">{job.companyName}</p>
                          <p className="text-sm text-gray-600">{job.location}</p>
                          <p className="text-sm text-gray-600">Posted on: {job.date}</p>
                          <p className="mt-2 text-gray-700">{job.jobDescription}</p>
                        </div>
                        <button
                          onClick={() => handleApproveJob(job.id)}
                          className="px-4 py-2 bg-[#1a2a5e] text-white rounded-lg
                           hover:bg-[#0e1a3a] transition"
                        >
                          Approve
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Alumni;