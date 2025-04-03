import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] p-4">
      {/* 404 Text */}
      <h1 className="text-6xl md:text-8xl font-bold text-[#1a2a5e] mb-4">
        404
      </h1>

      {/* Page Not Found Message */}
      <p className="text-xl md:text-2xl text-[#003366] mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Back to Home Button */}
      <Link to="/">
        <button className="bg-[#f36f21] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e65a1a] transition duration-300">
          Back to Home
        </button>
      </Link>

      {/* Additional Message */}
      <p className="mt-6 text-gray-600 text-center max-w-2xl mx-auto">
        If you believe this is an error, please contact us at{" "}
        <a
          href="mailto:support@gmitkolkata.org"
          className="text-[#1a2a5e] hover:underline"
        >
          support@gmitkolkata.org
        </a>
        .
      </p>
    </div>
  );
};

export default NotFound;