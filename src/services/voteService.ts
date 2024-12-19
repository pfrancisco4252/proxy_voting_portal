import { v4 as uuidv4 } from 'uuid';
import { Vote, VotingMetrics } from '../types/Vote';
import { getCompanies } from './companyService';

const votes: Vote[] = [];

export const castVote = (
  userId: string,
  documentId: string,
  companyId: string,
  choice: string,
  digitalSignature: string
): Vote => {
  const vote: Vote = {
    id: uuidv4(),
    userId,
    documentId,
    companyId,
    choice,
    timestamp: new Date(),
    digitalSignature
  };
  votes.push(vote);
  return vote;
};

export const getVotingMetrics = (documentId: string, companyId: string): VotingMetrics => {
  const documentVotes = votes.filter(v => v.documentId === documentId);
  const company = getCompanies().find(c => c.id === companyId);
  
  const results: { [key: string]: number } = {};
  documentVotes.forEach(vote => {
    results[vote.choice] = (results[vote.choice] || 0) + 1;
  });

  return {
    totalVotes: documentVotes.length,
    results,
    participationRate: company ? documentVotes.length / company.shareholders.length : 0
  };
};

export const exportVotesToExcel = (companyId: string): void => {
  // TODO: Implement Excel export
  const companyVotes = votes.filter(v => v.companyId === companyId);
  console.log('Exporting votes to Excel:', companyVotes);
};
