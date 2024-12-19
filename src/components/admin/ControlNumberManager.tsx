import React, { useState, useEffect } from 'react';
import { verificationService } from '../../services/verificationService';
import FileUpload from '../FileUpload';

interface ControlNumber {
  controlNumber: string;
  email: string;
  companyId: string;
  isVerified: boolean;
  verificationAttempts: number;
}

const ControlNumberManager: React.FC = () => {
  const [controlNumbers, setControlNumbers] = useState<ControlNumber[]>([]);
  const [newControlNumber, setNewControlNumber] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddControlNumber = async () => {
    try {
      await verificationService.registerControlNumber(
        newControlNumber,
        newEmail,
        selectedCompany
      );
      setSuccess('Control number added successfully');
      setNewControlNumber('');
      setNewEmail('');
      // Refresh control numbers list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add control number');
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const rows = text.split('\n').slice(1); // Skip header row
        
        for (const row of rows) {
          const [controlNumber, email, companyId] = row.split(',');
          if (controlNumber && email && companyId) {
            await verificationService.registerControlNumber(
              controlNumber.trim(),
              email.trim(),
              companyId.trim()
            );
          }
        }
        setSuccess('Control numbers imported successfully');
      };
      reader.readAsText(file);
    } catch (err) {
      setError('Failed to import control numbers');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Control Number Management</h2>

      {/* Add Single Control Number */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Add Control Number</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Control Number
            </label>
            <input
              type="text"
              value={newControlNumber}
              onChange={(e) => setNewControlNumber(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select Company</option>
              {/* Add company options here */}
            </select>
          </div>
          <button
            onClick={handleAddControlNumber}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Add Control Number
          </button>
        </div>
      </div>

      {/* Bulk Import */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Bulk Import</h3>
        <FileUpload
          onFileUploaded={handleFileUpload}
          acceptedTypes=".csv,.xlsx"
          maxSize={5 * 1024 * 1024}
        />
        <p className="text-sm text-gray-500 mt-2">
          Upload a CSV file with columns: Control Number, Email, Company ID
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-md mb-4">
          {success}
        </div>
      )}

      {/* Control Numbers List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Control Numbers</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Control Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {controlNumbers.map((cn) => (
                <tr key={cn.controlNumber}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cn.controlNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cn.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cn.companyId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      cn.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cn.isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => {/* Handle revoke */}}
                      className="text-red-600 hover:text-red-900"
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ControlNumberManager;
