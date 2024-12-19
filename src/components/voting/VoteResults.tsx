import React from 'react';
import { VoteItem, VoteResults as VoteResultsType } from '../../types/Vote';

interface VoteResultsProps {
  vote: VoteItem;
  results: VoteResultsType;
}

const VoteResults: React.FC<VoteResultsProps> = ({ vote, results }) => {
  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{vote.title} - Results</h3>

      <div className="space-y-6">
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <dt className="text-sm font-medium text-gray-500">Total Votes Cast</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              {results.totalVotes.toLocaleString()}
            </dd>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <dt className="text-sm font-medium text-gray-500">Total Voting Power</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              {results.totalVotingPower.toLocaleString()}
            </dd>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <dt className="text-sm font-medium text-gray-500">Participation Rate</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              {formatPercentage((results.totalVotingPower / vote.requiredVotingPower) * 100)}
            </dd>
          </div>
        </div>

        {/* Results Visualization */}
        <div className="space-y-4">
          {/* FOR Votes */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">For</span>
              <span className="text-sm font-medium text-gray-900">
                {results.results.FOR.toLocaleString()} votes ({formatPercentage(results.percentages.FOR)})
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${results.percentages.FOR}%` }}
              />
            </div>
          </div>

          {/* AGAINST Votes */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Against</span>
              <span className="text-sm font-medium text-gray-900">
                {results.results.AGAINST.toLocaleString()} votes ({formatPercentage(results.percentages.AGAINST)})
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-600 h-2.5 rounded-full"
                style={{ width: `${results.percentages.AGAINST}%` }}
              />
            </div>
          </div>

          {/* ABSTAIN Votes */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Abstain</span>
              <span className="text-sm font-medium text-gray-900">
                {results.results.ABSTAIN.toLocaleString()} votes ({formatPercentage(results.percentages.ABSTAIN)})
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-yellow-600 h-2.5 rounded-full"
                style={{ width: `${results.percentages.ABSTAIN}%` }}
              />
            </div>
          </div>
        </div>

        {/* Result Status */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Result Status</h4>
          <p className="text-sm text-gray-500">
            {results.percentages.FOR > 50
              ? 'Proposal has passed with majority support.'
              : 'Proposal has not received majority support.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoteResults;
