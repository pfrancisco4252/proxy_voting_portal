import React, { useState } from 'react';
import { VoteItem } from '../../types/Vote';
import DocumentUpload from './DocumentUpload';

interface EditVoteProps {
  vote: VoteItem;
  onSave: (updatedVote: VoteItem) => void;
  onCancel: () => void;
}

const EditVote: React.FC<EditVoteProps> = ({ vote, onSave, onCancel }) => {
  const [title, setTitle] = useState(vote.title);
  const [description, setDescription] = useState(vote.description);
  const [type, setType] = useState(vote.type);
  const [startDate, setStartDate] = useState(new Date(vote.startDate).toISOString().slice(0, 16));
  const [endDate, setEndDate] = useState(new Date(vote.endDate).toISOString().slice(0, 16));
  const [documentUrl, setDocumentUrl] = useState(vote.documentUrl);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Validate dates
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (end <= start) {
        throw new Error('End date must be after start date');
      }

      const updatedVote: VoteItem = {
        ...vote,
        title,
        description,
        type,
        startDate: start,
        endDate: end,
        documentUrl,
      };

      onSave(updatedVote);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update vote');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Edit Vote</h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vote Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vote Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'proposal', label: 'Proposal' },
              { id: 'director', label: 'Director Election' },
              { id: 'resolution', label: 'Resolution' },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setType(option.id as any)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-md
                  ${type === option.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Document Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supporting Documents
          </label>
          <DocumentUpload
            onUpload={(url) => setDocumentUrl(url)}
            acceptedFileTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
            maxFileSize={10 * 1024 * 1024} // 10MB
          />
          {documentUrl && (
            <div className="mt-2 text-sm text-gray-500">
              Current document: {documentUrl}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVote;
