import React from 'react';
import { VoteItem } from '../../types/Vote';

interface VoteCardProps {
  vote: VoteItem;
  onVote: () => void;
}

const VoteCard: React.FC<VoteCardProps> = ({ vote, onVote }) => {
  const daysRemaining = Math.ceil(
    (new Date(vote.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${vote.type === 'proposal'
              ? 'bg-blue-100 text-blue-800'
              : vote.type === 'director'
              ? 'bg-green-100 text-green-800'
              : 'bg-purple-100 text-purple-800'
            }`}
          >
            {vote.type.charAt(0).toUpperCase() + vote.type.slice(1)}
          </span>
          <span className="text-sm text-gray-500">
            {daysRemaining} days remaining
          </span>
        </div>

        <h3 className="mt-4 text-lg font-medium text-gray-900">{vote.title}</h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-3">{vote.description}</p>

        {vote.documentUrl && (
          <a
            href={vote.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
          >
            View Document
            <svg
              className="ml-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        )}

        <div className="mt-6">
          <button
            onClick={onVote}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cast Your Vote
          </button>
        </div>
      </div>

      {vote.results && (
        <div className="bg-gray-50 px-6 py-4">
          <div className="text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Total Votes:</span>
              <span>{vote.results.totalVotes}</span>
            </div>
            <div className="flex justify-between text-gray-500 mt-1">
              <span>Participation:</span>
              <span>
                {((vote.results.totalVotingPower / vote.requiredVotingPower) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoteCard;
