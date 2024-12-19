import React, { useState, useEffect } from 'react';
import { Shareholder } from '../../types/Shareholder';
import ShareholderList from './ShareholderList';
import ShareholderUpload from './ShareholderUpload';
import ShareholderActions from './ShareholderActions';

const ShareholderManagement: React.FC = () => {
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [selectedShareholders, setSelectedShareholders] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');

  const filteredShareholders = shareholders.filter(shareholder => {
    const matchesSearch = 
      shareholder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shareholder.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shareholder.controlNumber.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || shareholder.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Shareholders</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage shareholders, their voting rights, and access permissions
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            onClick={() => setIsUploading(true)}
          >
            Import Shareholders
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search shareholders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedShareholders.length > 0 && (
        <ShareholderActions
          selectedCount={selectedShareholders.length}
          onAction={(action) => {
            // Handle bulk actions
            console.log(action, selectedShareholders);
          }}
        />
      )}

      {/* Shareholders List */}
      <ShareholderList
        shareholders={filteredShareholders}
        selectedShareholders={selectedShareholders}
        onSelectionChange={setSelectedShareholders}
      />

      {/* Upload Modal */}
      {isUploading && (
        <ShareholderUpload
          onClose={() => setIsUploading(false)}
          onUpload={(data) => {
            // Handle shareholder data upload
            console.log('Uploaded data:', data);
            setIsUploading(false);
          }}
        />
      )}
    </div>
  );
};

export default ShareholderManagement;
