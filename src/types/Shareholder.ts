export interface Shareholder {
  id: string;
  controlNumber: string;
  name: string;
  email: string;
  companyId: string;
  shares: number;
  votingPower: number;
  status: 'active' | 'pending' | 'suspended';
  lastLogin?: Date;
  dateAdded: Date;
  documents: string[];
  voteHistory: {
    voteId: string;
    timestamp: Date;
    decision: string;
  }[];
}
