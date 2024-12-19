import React, { useState } from 'react';
import { verificationService } from '../services/verificationService';

interface ControlNumberVerificationProps {
  onVerificationSuccess: () => void;
  email: string;
  companyId: string;
}

const ControlNumberVerification: React.FC<ControlNumberVerificationProps> = ({
  onVerificationSuccess,
  email,
  companyId
}) => {
  const [controlNumber, setControlNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsVerifying(true);

    try {
      const isValid = await verificationService.verifyControlNumber(
        controlNumber,
        email,
        companyId
      );

      if (isValid) {
        onVerificationSuccess();
      } else {
        setError('Invalid control number. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Verify Control Number</h2>
      <form onSubmit={handleVerification} className="space-y-4">
        <div>
          <label 
            htmlFor="controlNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Control Number
          </label>
          <input
            id="controlNumber"
            type="text"
            value={controlNumber}
            onChange={(e) => setControlNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your control number"
            required
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isVerifying}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            ${isVerifying ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default ControlNumberVerification;
