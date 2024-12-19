import React, { useState, useEffect } from 'react';
import { VoteItem } from '../../types/Vote';
import VoteList from './VoteList';
import VotingHistory from './VotingHistory';
import UpcomingVotes from './UpcomingVotes';

const VotingDashboard: React.FC = () => {
  const [activeVotes, setActiveVotes] = useState<VoteItem[]>([]);
  const [upcomingVotes, setUpcomingVotes] = useState<VoteItem[]>([]);
  const [votingHistory, setVotingHistory] = useState<VoteItem[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'history'>('active');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Shareholder Voting</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and participate in active votes, check upcoming votes, and review your voting history
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {[
            { id: 'active', name: 'Active Votes', count: activeVotes.length },
            { id: 'upcoming', name: 'Upcoming', count: upcomingVotes.length },
            { id: 'history', name: 'History', count: votingHistory.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.name}
              {tab.count > 0 && (
                <span
                  className={`ml-3 rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block
                    ${activeTab === tab.id
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'bg-gray-100 text-gray-900'
                    }
                  `}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'active' && (
          <VoteList
            votes={activeVotes}
            onVote={(voteId) => {
              // Handle vote action
              console.log('Voting for:', voteId);
            }}
          />
        )}
        {activeTab === 'upcoming' && (
          <UpcomingVotes votes={upcomingVotes} />
        )}
        {activeTab === 'history' && (
          <VotingHistory votes={votingHistory} />
        )}
      </div>
    </div>
  );
};

export default VotingDashboard;
