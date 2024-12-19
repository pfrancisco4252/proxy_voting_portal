import React from 'react';
import { VoteItem } from '../../types/Vote';
import VoteCard from './VoteCard';

interface VoteListProps {
  votes: VoteItem[];
  onVote: (voteId: string) => void;
}

const VoteList: React.FC<VoteListProps> = ({ votes, onVote }) => {
  if (votes.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No Active Votes</h3>
        <p className="mt-1 text-sm text-gray-500">
          There are currently no active votes requiring your attention.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {votes.map((vote) => (
        <VoteCard
          key={vote.id}
          vote={vote}
          onVote={() => onVote(vote.id)}
        />
      ))}
    </div>
  );
};

export default VoteList;
