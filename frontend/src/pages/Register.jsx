import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/Auth";
import QrCode from "../assets/qrcode.png";

const Register = () => {
  const pending = false;
  const { setFormDatas, formDatas } = useAuth();
  const [details, setDetails] = useState({
    name: "",
    graduationYear: "",
    phoneNumber: "",
    address: "",
    email: "",
    organization: "",
    dateOfBirth: "",
    rollNumber: "",
    registrationNumber: "",
    designation: "",
    department: "",
  });

  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("name", details.name);
    formData.append("graduationYear", details.graduationYear);
    formData.append("phoneNumber", details.phoneNumber);
    formData.append("address", details.address);
    formData.append("email", details.email);
    formData.append("organization", details.organization);
    formData.append("dateOfBirth", details.dateOfBirth);
    formData.append("rollNumber", details.rollNumber);
    formData.append("registrationNumber", details.registrationNumber);
    formData.append("designation", details.designation);
    formData.append("department", details.department);
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/upload-files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormDatas(response.data.data);
      toast.success("File uploaded successfully!");
      
      // navigate("/card");
      navigate("/processing")

    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    }
  };

  return (
    <div className='min-h-screen bg-[#f8f9fa]'>
      {/* Registration Form */}
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10'>
        {/* Header Section */}
        <div className='bg-[#1a2a5e] text-white py-6 px-8'>
          <h2 className='text-3xl font-bold'>Alumni Registration</h2>
          <p className='text-lg mt-2'>
            Join the GMIT Alumni Network to stay connected with your alma mater
          </p>
        </div>

        {/* Payment Details Section */}
        <div className='p-8 border-b border-gray-200'>
          <h3 className='text-2xl font-semibold text-[#1a2a5e] mb-6'>Payment Details</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* QR Code */}
            <div className='flex flex-col justify-center items-center'>
              <img
                src={QrCode} // Path to your QR code image
                alt='Payment QR Code'
                className='w-48 h-48 rounded-lg shadow-md'
              />
              {/* UPI Handle */}
              <p className="mt-4 text-lg font-semibold text-[#1a2a5e]">
                UPI: gmitalumni@upi
              </p>
            </div>

            {/* Bank Details */}
            <div className='space-y-4 text-gray-700'>
              <p>
                <span className='font-semibold text-[#1a2a5e]'>Account Name:</span> GMIT Alumni Association
              </p>
              <p>
                <span className='font-semibold text-[#1a2a5e]'>Account Number:</span> 1234567890
              </p>
              <p>
                <span className='font-semibold text-[#1a2a5e]'>Bank Name:</span> Example Bank
              </p>
              <p>
                <span className='font-semibold text-[#1a2a5e]'>IFSC Code:</span> EXMP0001234
              </p>
              <p>
                <span className='font-semibold text-[#1a2a5e]'>Branch:</span> Main Branch, City
              </p>
              <p className='text-sm text-gray-500'>
                After making the payment, upload the receipt in the form below.
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form className='p-8' onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Personal Details */}
            <input required
              type='text'
              name='name'
              placeholder='Full Name'
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1a2a5e]'
              value={details.name}
              onChange={handleChange}
            />
            <input required
              type='email'
              name='email'
              placeholder='Email'
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1a2a5e]'
              onChange={handleChange}
              value={details.email}
            />
            <input required
              type='tel'
              name='phoneNumber'
              placeholder='Phone Number'
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1a2a5e]'
              onChange={handleChange}
              value={details.phoneNumber}
            />
            <input required
              type='date'
              name='dateOfBirth'
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1a2a5e]'
              onChange={handleChange}
              value={details.dateOfBirth}
            />

            {/* Academic Details */}
            <select
              name='department'
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1a2a5e]'
              onChange={handleChange}
              value={details.department}
            >
              <option value=''>Select Department</option>
              <option value='CSE'>CSE</option>
              <option value='ECE'>ECE</option>
              <option value='CSBS'>CSBS</option>
              <option value='EE'>EE</option>
              <option value='ME'>ME</option>
            </select>
            <select
              name='graduationYear'
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1a2a5e]'
              value={details.graduationYear}
              onChange={handleChange}
            >
              <option value=''>Select Year</option>
              <option value='2023'>2023</option>
              <option value='2022'>2022</option>
              <option value='2021'>2021</option>
              <option value='2020'>2020</option>
              <option value='2019'>2019</option>
              <option value='2018'>2018</option>
              <option value='2017'>2017</option>
              <option value='2016'>2016</option>
              <option value='2015'>2015</option>
              <option value='2014'>2014</option>
              <option value='2013'>2013</option>
              <option value='2012'>2012</option>
            </select>
            <input required
              type='text'
              name='rollNumber'
              placeholder='Roll Number'
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1a2a5e]'
              onChange={handleChange}
              value={details.rollNumber}
            />
            <input required
              type='text'
              name='registrationNumber'
              placeholder='Registration Number'
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1a2a5e]'
              onChange={handleChange}
              value={details.registrationNumber}
            />

            {/* Professional Details */}
            <input
              type='text'
              name='organization'
              placeholder='Current Organization (Optional)'
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1a2a5e]'
              onChange={handleChange}
              value={details.organization}
            />
            <input
              type='text'
              name='designation'
              placeholder='Designation (Optional)'
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1a2a5e]'
              onChange={handleChange}
              value={details.designation}
            />

            {/* Additional Details */}
            <div className='col-span-2'>
              <input required
                type='text'
                name='address'
                placeholder='Permanent Address'
                className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1a2a5e]'
                onChange={handleChange}
              />
            </div> 
            <div className='col-span-2'>
              <label className='block text-gray-700 font-medium mb-2'>Upload Payment Receipt (Image)</label>
              <input 
                type='file'
                name='file'
                id='file'
                accept='image/*' // Allow all image types
                onChange={(e) => setFile(e.target.files[0])}
                className='w-full p-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1a2a5e]'
              />
              {file && <p className='text-sm text-green-600 mt-2'>{file.name}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className='mt-8 text-center'>
            <button
              type='submit'
              className='px-8 py-3 bg-[#1a2a5e] text-white rounded-lg hover:bg-[#0e1a3a] transition duration-300'
            >
              Submit
            </button>
          </div>

          <p className='text-center text-gray-500 text-sm mt-6'>
            By registering, you agree to our{" "}
            <a href='/' className='text-[#1a2a5e] hover:underline'>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href='/' className='text-[#1a2a5e] hover:underline'>
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;