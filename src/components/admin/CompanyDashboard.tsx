import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CompanyPortal } from '../../types/Admin';

const CompanyDashboard: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [company, setCompany] = useState<CompanyPortal | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'shareholders', label: 'Shareholders' },
    { id: 'votes', label: 'Active Votes' },
    { id: 'documents', label: 'Documents' },
    { id: 'reports', label: 'Reports' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {company && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Company Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-500">
                      {company.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                  <p className="text-sm text-gray-500">{company.domain}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Settings
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  New Vote
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quick Stats */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Total Shareholders</h3>
                  <p className="text-3xl font-bold">150</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Active Votes</h3>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Completed Votes</h3>
                  <p className="text-3xl font-bold">12</p>
                </div>
              </div>
            )}

            {activeTab === 'shareholders' && (
              <div>
                {/* Shareholders list component */}
              </div>
            )}

            {activeTab === 'votes' && (
              <div>
                {/* Active votes component */}
              </div>
            )}

            {activeTab === 'documents' && (
              <div>
                {/* Documents component */}
              </div>
            )}

            {activeTab === 'reports' && (
              <div>
                {/* Reports component */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
