import React, { useEffect, useState } from "react";
import { FiUser, FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { useAuth } from "../stores/Auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const { getAlltheAlumni, alumniStudent, isLoggedin } = useAuth();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("name");
  const [filteredAlumni, setFilteredAlumni] = useState([]);

  if (isLoggedin) {
    useEffect(() => {
      getAlltheAlumni();
    }, []);
  } else {
    useEffect(() => {
      toast.warn("Login required!");
    }, []);
  }

  useEffect(() => {
    const filtered = alumniStudent.filter((user) => {
      if (filter === "name") {
        return user.name.toLowerCase().includes(searchInput.toLowerCase());
      } else if (filter === "email") {
        return user.email.toLowerCase().includes(searchInput.toLowerCase());
      } else if (filter === "registrationNumber") {
        return user.registrationNumber.toLowerCase().includes(searchInput.toLowerCase());
      }
      return true;
    });
    setFilteredAlumni(filtered);
  }, [searchInput, filter, alumniStudent]);

  // Function to handle approve action
  const handleApprove = async (userId) => {
    const confirmApprove = window.confirm("Do you want to approve?")
    if(!confirmApprove){
      return ;
    }

    try {
      const response = await fetch(`https://reuniv-backend.onrender.com/api/auth/admin/approve-user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const res_data = await response.json();
        console.log("from approval: ", res_data);
        getAlltheAlumni();
        navigate(`/card/${userId}`);
        toast.success("User approved successfully.");
      } else {
        toast.error("Failed to approve user.");
      }
    } catch (error) {
      console.error("Error approving user:", error);
      toast.error("An error occurred while approving the user.");
    }
  };

  // Function to handle reject action
  const handleReject = async (id) => {
    const confirmReject = window.confirm("Do you want to reject?");
    if(!confirmReject){
      return;
    }

    try {
      console.log(id);
      const response = await fetch(`https://reuniv-backend.onrender.com/api/auth/admin/delete-user/${id}`, {
        method: "DELETE",
      });
      console.log("FROM HANDLE REJECTION", response);
      if (response.ok) {
        const res_data = await response.json();
        console.log("from rejection: ", res_data);
        getAlltheAlumni();
        toast.success("User rejected successfully.");
      } else {
        toast.error("Failed to reject user.");
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
      toast.error("An error occurred while rejecting the user.");
    }
  };

  const deleteUserbyid = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete?");
    if(!confirmDelete){
      return;
    }
    try {
      console.log(id);
      const response = await fetch(`https://reuniv-backend.onrender.com/api/auth/admin/delete-user/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const res_data = await response.json();
        getAlltheAlumni();
        toast.success("User Deleted successfully.");
      } else {
        toast.error("Failed to Delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting the user.");
    }
  };

  return (
    <div className='p-6 bg-[#f5f5f5] min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-[#1a2a5e]'>Alumni</h1>
          <div className='flex gap-4'>
            <div className='bg-[#f36f21] text-white font-semibold text-lg px-4 py-2 rounded-lg 
            shadow-md'>
              Total Alumni: {alumniStudent.length}
            </div>
            <button
              onClick={() => navigate("/admin")}
              className='bg-[#1a2a5e] text-white font-semibold px-4 py-2 rounded-lg 
              shadow-md hover:bg-[#0e1a3a] transition'
            >
              Go to Dashboard
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className='mb-6 flex gap-4'>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm 
            focus:outline-none focus:border-[#1a2a5e]'
          >
            <option value='name'>Name</option>
            <option value='email'>Email</option>
            <option value='registrationNumber'>Registration Number</option>
          </select>
          <input
            type='text'
            placeholder={`Search by ${filter}`}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:border-[#1a2a5e]'
          />
        </div>

        <div className='bg-white shadow-lg rounded-lg overflow-x-auto border border-gray-200'>
          <table className='w-full text-sm text-left min-w-max'>
            <thead className='bg-[#1a2a5e] text-white uppercase text-sm'>
              <tr>
                <th className='py-4 px-4 sticky left-0 bg-[#1a2a5e] z-10'>Name</th>
                <th className='py-4 px-4'>Email</th>
                <th className='py-4 px-4'>Phone</th>
                <th className='py-4 px-4'>Address</th>
                <th className='py-4 px-4'>Department</th>
                <th className='py-4 px-4'>Registration No</th>
                <th className='py-4 px-4'>Organization</th>
                <th className='py-4 px-4 text-center'>Graduation Year</th>
                <th className='py-4 px-4 text-center'>File</th>
                <th className='py-4 px-4 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {filteredAlumni.length > 0 ? (
                filteredAlumni.map((user, index) => (
                  <tr key={index} className='border-b border-gray-200 hover:bg-gray-50 transition'>
                    <td className='py-4 px-4 flex items-center gap-2 sticky left-0 bg-white z-10'>
                      <FiUser className='text-gray-500 text-lg' />
                      <span className='font-medium'>{user.name}</span>
                    </td>
                    <td className='py-4 px-4'>{user.email}</td>
                    <td className='py-4 px-4'>{user.phoneNumber}</td>
                    <td className='py-4 px-4'>{user.address}</td>
                    <td className='py-4 px-4'>{user.department}</td>
                    <td className='py-4 px-4'>{user.registrationNumber}</td>
                    <td className='py-4 px-4'>{user.organization}</td>
                    <td className='py-4 px-4 text-center'>{user.graduationYear}</td>
                    <td className='py-4 px-4 text-center'>
                      <a
                        href={`http://localhost:3000/files/${user.file}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-[#1a2a5e] hover:text-[#f36f21] hover:underline transition'
                      >
                        View File
                      </a>
                    </td>
                    <td className='py-4 px-4 flex justify-center gap-4'>
                      {!user.isApproved && (
                        <>
                          <button
                            onClick={() => handleApprove(user._id)}
                            className='text-green-500 hover:bg-green-100 p-2 rounded-lg transition'
                          >
                            <FiCheck className='text-lg' />
                          </button>
                          <button
                            onClick={() => handleReject(user._id)}
                            className='text-red-500 hover:bg-red-100 p-2 rounded-lg transition'
                          >
                            <FiX className='text-lg' />
                          </button>
                        </>
                      )}
                      <Link to={`/admin/alumnis/${user._id}/edit`}>
                        <button className='text-[#1a2a5e] hover:bg-[#f36f21] hover:text-white
                         p-2 rounded-lg transition'>
                          <FiEdit className='text-lg' />
                        </button>
                      </Link>
                      <button
                        className='text-red-500 hover:bg-red-100 p-2 rounded-lg transition'
                        onClick={() => deleteUserbyid(user._id)}
                      >
                        <FiTrash2 className='text-lg' />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='10' className='py-6 px-4 text-center text-gray-500'>
                    No alumni found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;