import React, { useState } from 'react';
import { VoteItem, VoteDecision } from '../../types/Vote';

interface VoteBallotProps {
  vote: VoteItem;
  shareholderShares: number;
  onSubmitVote: (decision: VoteDecision) => Promise<void>;
  onCancel: () => void;
}

const VoteBallot: React.FC<VoteBallotProps> = ({
  vote,
  shareholderShares,
  onSubmitVote,
  onCancel
}) => {
  const [selectedDecision, setSelectedDecision] = useState<VoteDecision | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVoteSubmit = async () => {
    if (!selectedDecision) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmitVote(selectedDecision);
    } catch (err) {
      setError('Failed to submit vote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{vote.title}</h2>
        <p className="mt-2 text-sm text-gray-500">
          Your voting power: {shareholderShares.toLocaleString()} shares
        </p>
      </div>

      {vote.documentUrl && (
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">Review Document</span>
            <a
              href={vote.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center"
            >
              Open Document
              <svg className="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="text-sm font-medium text-gray-700 mb-2">
          Cast your vote:
        </div>
        
        {/* Vote Buttons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* For Button */}
          <button
            onClick={() => setSelectedDecision('FOR')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors
              ${selectedDecision === 'FOR'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-200'
              }`}
          >
            <svg className={`h-8 w-8 mb-2 ${
              selectedDecision === 'FOR' ? 'text-green-500' : 'text-gray-400'
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">For</span>
            <span className="text-sm text-gray-500">In favor</span>
          </button>

          {/* Against Button */}
          <button
            onClick={() => setSelectedDecision('AGAINST')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors
              ${selectedDecision === 'AGAINST'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-red-200'
              }`}
          >
            <svg className={`h-8 w-8 mb-2 ${
              selectedDecision === 'AGAINST' ? 'text-red-500' : 'text-gray-400'
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="font-medium">Against</span>
            <span className="text-sm text-gray-500">Opposed</span>
          </button>

          {/* Abstain Button */}
          <button
            onClick={() => setSelectedDecision('ABSTAIN')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors
              ${selectedDecision === 'ABSTAIN'
                ? 'border-yellow-500 bg-yellow-50'
                : 'border-gray-200 hover:border-yellow-200'
              }`}
          >
            <svg className={`h-8 w-8 mb-2 ${
              selectedDecision === 'ABSTAIN' ? 'text-yellow-500' : 'text-gray-400'
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Abstain</span>
            <span className="text-sm text-gray-500">No preference</span>
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-md">
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

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleVoteSubmit}
            disabled={!selectedDecision || isSubmitting}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white
              ${!selectedDecision || isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Vote'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteBallot;
