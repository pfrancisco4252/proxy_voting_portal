import React, { useState } from 'react';
import FileUpload from '../FileUpload';

interface Shareholder {
  id: string;
  name: string;
  email: string;
  controlNumber: string;
  shares: number;
  status: 'active' | 'pending' | 'suspended';
  lastLogin?: Date;
}

const ShareholderManagement: React.FC = () => {
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [showImport, setShowImport] = useState(false);
  const [selectedShareholders, setSelectedShareholders] = useState<string[]>([]);

  const handleImport = async (file: File) => {
    // Implementation for processing Excel/CSV file
    console.log('Processing file:', file);
  };

  const handleExport = () => {
    // Implementation for exporting shareholder data
    console.log('Exporting shareholders');
  };

  const handleBulkAction = (action: string) => {
    // Implementation for bulk actions
    console.log('Bulk action:', action, 'for:', selectedShareholders);
  };

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setShowImport(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Import Shareholders
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Export
          </button>
        </div>
        
        {selectedShareholders.length > 0 && (
          <div className="flex space-x-2">
            <select
              onChange={(e) => handleBulkAction(e.target.value)}
              className="border border-gray-300 rounded-md"
            >
              <option value="">Bulk Actions</option>
              <option value="activate">Activate</option>
              <option value="suspend">Suspend</option>
              <option value="delete">Delete</option>
            </select>
            <button
              onClick={() => setSelectedShareholders([])}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>

      {/* Shareholder Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedShareholders(shareholders.map(s => s.id));
                    } else {
                      setSelectedShareholders([]);
                    }
                  }}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Control Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shares
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shareholders.map((shareholder) => (
              <tr key={shareholder.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedShareholders.includes(shareholder.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedShareholders([...selectedShareholders, shareholder.id]);
                      } else {
                        setSelectedShareholders(selectedShareholders.filter(id => id !== shareholder.id));
                      }
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{shareholder.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{shareholder.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{shareholder.controlNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{shareholder.shares}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${shareholder.status === 'active' ? 'bg-green-100 text-green-800' :
                      shareholder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {shareholder.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {shareholder.lastLogin?.toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button className="ml-4 text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Import Modal */}
      {showImport && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Import Shareholders</h3>
            <FileUpload
              onFileUploaded={handleImport}
              acceptedTypes=".csv,.xlsx"
              maxSize={5 * 1024 * 1024}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowImport(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareholderManagement;
