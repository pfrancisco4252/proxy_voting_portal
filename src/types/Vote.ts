export interface VoteItem {
  id: string;
  title: string;
  description: string;
  documentUrl?: string;
  type: 'proposal' | 'director' | 'resolution';
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'active' | 'closed';
  requiredVotingPower: number;
  results?: VoteResults;
}

export type VoteDecision = 'FOR' | 'AGAINST' | 'ABSTAIN';

export interface VoteResults {
  totalVotes: number;
  totalVotingPower: number;
  results: {
    FOR: number;
    AGAINST: number;
    ABSTAIN: number;
  };
  percentages: {
    FOR: number;
    AGAINST: number;
    ABSTAIN: number;
  };
}

export interface Ballot {
  id: string;
  voteId: string;
  shareholderId: string;
  decision: VoteDecision;
  votingPower: number;
  timestamp: Date;
  signature?: string;
}
