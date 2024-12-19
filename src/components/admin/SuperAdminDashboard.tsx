import React, { useState, useEffect } from 'react';
import { CompanyPortal } from '../../types/Admin';
import CompanyCard from './CompanyCard';
import CreateCompanyModal from './CreateCompanyModal';

const SuperAdminDashboard: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyPortal[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<CompanyPortal['status'] | 'ALL'>('ALL');

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || company.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Company Portals</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Create New Portal
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search companies..."
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as CompanyPortal['status'] | 'ALL')}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="ALL">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="SUSPENDED">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onSelect={() => {/* Navigate to company dashboard */}}
            />
          ))}
        </div>

        {/* Create Company Modal */}
        {showCreateModal && (
          <CreateCompanyModal
            onClose={() => setShowCreateModal(false)}
            onCreate={(newCompany) => {
              setCompanies([...companies, newCompany]);
              setShowCreateModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
