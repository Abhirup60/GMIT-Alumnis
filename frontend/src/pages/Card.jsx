import React, { useEffect } from "react";
import { useAuth } from "../stores/Auth";
import { toPng } from "html-to-image"; // Use html-to-image
import gmit_logo from "../assets/gmit-logo-e1713306262413.png";
import jis_logo from "../assets/jis-logo-e1713306293781.png";


const Card = () => {
  const { formDatas } = useAuth();

  useEffect(() => {
    if (formDatas) {
      console.log("form data: ", formDatas);
    }
  }, [formDatas]);

  // Function to download the ID card as an image
  const downloadIDCard = async () => {
    const cardElement = document.getElementById("id-card");
    if (cardElement) {
      try {
        // Ensure all images are loaded before capturing
        const images = cardElement.querySelectorAll("img");
        await Promise.all(
          Array.from(images).map((img) => {
            if (!img.complete) {
              return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
              });
            }
            return Promise.resolve();
          })
        );

        // Convert the card to an image
        const dataUrl = await toPng(cardElement, {
          quality: 1, // Highest quality
          pixelRatio: 2, // Higher resolution
        });

        // Download the image
        const link = document.createElement("a");
        link.download = "GMIT_Alumni_ID_Card.png";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error capturing the card:", error);
      }
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5f5] p-4 sm:p-6 md:p-8">
      {/* ID Card */}
      <div
        id="id-card"
        className="w-[110.6mm] h-[68.98mm] bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-[#1a2a5e] p-2 flex flex-row"
      >
        {/* Left Section: Photo and Logo */}
        <div className="w-1/3 flex flex-col items-center justify-between p-2 border-r-2 border-gray-200">
          {/* Avatar Placeholder */}
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <img
              src="https://img.icons8.com/?size=100&id=WWIRij774QJt&format=png&color=000000"
              alt="avatar"
              crossOrigin="anonymous" // Enable CORS for the image
              className="w-16 h-16"
            />
          </div>
          <img
            src={jis_logo}
            alt="JIS Logo"
            className="w-14 h-14"
          />
          {/* College Logo */}
          <img
            src={gmit_logo}
            alt="GMIT Logo"
            className="w-60 h-16"
          />
        </div>

        {/* Right Section: Details */}
        <div className="w-2/3 flex flex-col justify-between p-2">
          {/* Header */}
          <div className="text-center mb-2">
            <h2 className="text-sm font-bold text-[#1a2a5e]">
              GARGI MEMORIAL INSTITUTE OF TECHNOLOGY
            </h2>
            <p className="text-[8px] text-gray-600">
              Baruipur, Mouza Beralia, Balarampur, Kolkata-700144
            </p>
          </div>

          {/* Student ID Section */}
          <div className="bg-[#f36f21] text-white rounded-sm p-1 text-center mb-2">
            <h3 className="text-[10px] font-bold">ALUMNI ID: {formDatas?.registrationNumber || "N/A"}</h3>
          </div>

          {/* Student Details */}
          <div className="space-y-1 text-[8px] text-gray-800">
            {formDatas ? (
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-1 font-semibold">Name:</td>
                    <td className="py-1">{formDatas.name || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-semibold">Department:</td>
                    <td className="py-1">{formDatas.department || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-semibold">Year of Graduation:</td>
                    <td className="py-1">{formDatas.graduationYear || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-semibold">Address:</td>
                    <td className="py-1">{formDatas.address || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-600">No data available</p>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-[6px] text-gray-600">
            <p>© {new Date().getFullYear()} GMIT Alumni Association</p>
            <p>Official Alumni ID Card</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadIDCard}
        className="mt-8 bg-[#1a2a5e] text-white px-6 py-3 rounded-lg hover:bg-[#0e1a3a] transition"
      >
        Download ID Card
      </button>
    </div>
  );
};

export default Card;