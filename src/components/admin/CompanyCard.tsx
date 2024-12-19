import React from 'react';
import { CompanyPortal } from '../../types/Admin';
import { Link } from 'react-router-dom';

interface CompanyCardProps {
  company: CompanyPortal;
  onSelect: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onSelect }) => {
  const getStatusColor = (status: CompanyPortal['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      case 'SUSPENDED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {company.logo ? (
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-500">
                  {company.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(company.status)}`}>
                {company.status}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>Created: {company.createdAt.toLocaleDateString()}</p>
          <p>Domain: {company.domain || 'Not configured'}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Link
            to={`/admin/company/${company.id}/dashboard`}
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Dashboard
          </Link>
          <Link
            to={`/admin/company/${company.id}/settings`}
            className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Settings
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4">
        <div className="flex justify-between text-sm">
          <span>Shareholders: 150</span>
          <span>Active Votes: 3</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
