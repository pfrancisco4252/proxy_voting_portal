import { VoteItem } from '../types/Vote';

export const mockVotes: VoteItem[] = [
  {
    id: '1',
    title: 'Annual Board Election 2024',
    description: 'Election of board members for the upcoming fiscal year',
    type: 'director',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-15'),
    status: 'upcoming',
    requiredVotingPower: 1000000,
    documentUrl: '#'
  },
  {
    id: '2',
    title: 'Shareholder Resolution #127',
    description: 'Proposal for new environmental sustainability initiatives',
    type: 'resolution',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-15'),
    status: 'active',
    requiredVotingPower: 1000000,
    documentUrl: '#',
    results: {
      totalVotes: 750000,
      totalVotingPower: 750000,
      results: {
        FOR: 500000,
        AGAINST: 200000,
        ABSTAIN: 50000
      },
      percentages: {
        FOR: 66.67,
        AGAINST: 26.67,
        ABSTAIN: 6.66
      }
    }
  },
  {
    id: '3',
    title: 'Special Dividend Approval',
    description: 'Vote on the proposed special dividend distribution',
    type: 'proposal',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-15'),
    status: 'closed',
    requiredVotingPower: 1000000,
    documentUrl: '#',
    results: {
      totalVotes: 900000,
      totalVotingPower: 900000,
      results: {
        FOR: 800000,
        AGAINST: 50000,
        ABSTAIN: 50000
      },
      percentages: {
        FOR: 88.89,
        AGAINST: 5.56,
        ABSTAIN: 5.55
      }
    }
  }
];
