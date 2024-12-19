import React from 'react';
import { Ballot, VoteItem } from '../../types/Vote';
import { formatDate } from '../../utils/dateUtils';

interface VoteConfirmationProps {
  vote: VoteItem;
  ballot: Ballot;
  onDownloadReceipt: () => void;
  onClose: () => void;
}

const VoteConfirmation: React.FC<VoteConfirmationProps> = ({
  vote,
  ballot,
  onDownloadReceipt,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Vote Confirmed</h3>
          <p className="mt-2 text-sm text-gray-500">
            Your vote has been successfully recorded and signed.
          </p>
        </div>

        <div className="mt-6 bg-gray-50 rounded-md p-4">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Vote ID:</dt>
              <dd className="text-gray-900 font-mono">{ballot.id}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Proposal:</dt>
              <dd className="text-gray-900">{vote.title}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Decision:</dt>
              <dd className={`font-medium ${
                ballot.decision === 'FOR' 
                  ? 'text-green-600'
                  : ballot.decision === 'AGAINST'
                  ? 'text-red-600'
                  : 'text-yellow-600'
              }`}>
                {ballot.decision}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Voting Power:</dt>
              <dd className="text-gray-900">{ballot.votingPower.toLocaleString()} shares</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Timestamp:</dt>
              <dd className="text-gray-900">{formatDate(ballot.timestamp)}</dd>
            </div>
            {ballot.signature && (
              <div className="pt-3 border-t">
                <dt className="text-gray-500 mb-1">Digital Signature:</dt>
                <dd className="text-gray-900 font-mono text-xs break-all">
                  {ballot.signature}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
          <button
            onClick={onDownloadReceipt}
            className="w-full sm:w-auto flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Receipt
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteConfirmation;
