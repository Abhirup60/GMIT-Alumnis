import React from 'react';

const WaitingCard = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Verification in Progress</h2>
        <p className="text-gray-600">
          Your details are being checked by the college. You will be given a card once approved. 
          Please contact your responsible teacher for more information.
        </p>
      </div>
    </div>
  );
};

export default WaitingCard;
