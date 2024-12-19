import React, { useState } from 'react';
import { CompanyPortal } from '../../types/Admin';

interface CreateCompanyModalProps {
  onClose: () => void;
  onCreate: (company: CompanyPortal) => void;
}

const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    logo: '',
    primaryColor: '#4F46E5',
    secondaryColor: '#818CF8',
    settings: {
      allowChat: true,
      requireControlNumber: true,
      allowEmailVerification: true,
      customVotingButtons: true,
      votingPeriodEnabled: true
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCompany: CompanyPortal = {
      id: Date.now().toString(),
      ...formData,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    onCreate(newCompany);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Create New Company Portal</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Domain
                </label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => setFormData({...formData, domain: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>

            {/* Branding */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Branding</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Logo URL
                </label>
                <input
                  type="url"
                  value={formData.logo}
                  onChange={(e) => setFormData({...formData, logo: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                    className="mt-1 block w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
            </div>

            {/* Portal Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Portal Settings</h3>
              <div className="space-y-2">
                {Object.entries(formData.settings).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      id={key}
                      checked={value}
                      onChange={(e) => setFormData({
                        ...formData,
                        settings: {
                          ...formData.settings,
                          [key]: e.target.checked
                        }
                      })}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={key} className="ml-2 block text-sm text-gray-900">
                      {key.split(/(?=[A-Z])/).join(' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Create Portal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyModal;
