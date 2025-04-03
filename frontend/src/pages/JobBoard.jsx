import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import gsap from "gsap";
import { format } from "date-fns";

const JobBoard = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const headerRef = useRef(null);
  const plusButtonRef = useRef(null);
  const jobsSectionRef = useRef(null);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://reuniv-backend.onrender.com/job/jobform");
        if (response.ok) {
          const data = await response.json();
          setPostedJobs(data);
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // GSAP Animations
  useEffect(() => {
    gsap.set(headerRef.current, { y: -50, opacity: 0 });
    gsap.set(plusButtonRef.current, { scale: 0, opacity: 0 });
    gsap.set(jobsSectionRef.current, { y: 50, opacity: 0 });

    gsap.to(headerRef.current, {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power3.out",
    });

    gsap.to(plusButtonRef.current, {
      duration: 1,
      scale: 1,
      opacity: 1,
      ease: "elastic.out(1, 0.75)",
      delay: 0.5,
    });

    gsap.to(jobsSectionRef.current, {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power3.out",
      delay: 1,
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const today = format(new Date(), "EEEE, MMMM do, yyyy");

  return (
    <div className='min-h-screen bg-[#f8f9fa] p-6'>
      <div className='max-w-4xl mx-auto'>
        <div ref={headerRef} className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-[#1a2a5e] mb-2'>Job Board</h1>
          <p className='text-lg text-gray-600'>Explore job opportunities posted by alumni.</p>
        </div>

        <div ref={plusButtonRef} className='flex justify-left mb-4'>
          <Link
            to='/job-post'
            className='bg-[#f36f21] text-white p-4 rounded-full shadow-lg hover:bg-[#e65a1a]
             transition'
          >
            <IoMdAdd />
          </Link>
        </div>

        <div ref={jobsSectionRef} className='bg-white shadow-lg rounded-lg p-6'>
          <h2 className='text-2xl font-semibold text-[#1a2a5e] mb-4'>Posted Jobs</h2>
          {postedJobs.length > 0 ? (
            <div className='space-y-4'>
              {postedJobs.map((job) => (
                <div key={job._id} className='p-4 border border-gray-200 rounded-lg hover:shadow-md transition'>
                  <h3 className='text-xl font-bold text-[#1a2a5e]'>{job.jobtitle}</h3>
                  <p className='text-sm text-gray-600'>{job.companyname}</p>
                  <p className='text-sm text-gray-600'>{job.location}</p>
                  <p className='mt-2 text-gray-700'>{job.jobdesc}</p>
                  <p>Today's Date: {today}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-center text-gray-600'>No jobs posted yet.</p>
          )}
        </div>
      </div>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-4 right-4 bg-[#f36f21] text-white p-3 rounded-full shadow-lg 
          hover:bg-[#e65a1a] transition-transform transform hover:scale-110'
          aria-label='Scroll to top'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 10l7-7m0 0l7 7m-7-7v18' />
          </svg>
        </button>
      )}
    </div>
  );
};

export default JobBoard;
