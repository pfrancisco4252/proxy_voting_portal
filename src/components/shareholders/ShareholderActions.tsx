import React from 'react';

interface ShareholderActionsProps {
  selectedCount: number;
  onAction: (action: string) => void;
}

const ShareholderActions: React.FC<ShareholderActionsProps> = ({
  selectedCount,
  onAction,
}) => {
  return (
    <div className="bg-gray-50 px-4 py-3 mt-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 rounded-lg">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">
          {selectedCount} shareholder{selectedCount !== 1 ? 's' : ''} selected
        </p>
      </div>
      <div className="mt-3 flex sm:mt-0 sm:ml-4">
        <button
          type="button"
          onClick={() => onAction('email')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send Email
        </button>
        <button
          type="button"
          onClick={() => onAction('export')}
          className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Export
        </button>
        <button
          type="button"
          onClick={() => onAction('status')}
          className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Change Status
        </button>
        <button
          type="button"
          onClick={() => onAction('delete')}
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ShareholderActions;
