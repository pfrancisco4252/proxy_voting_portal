import { VoteItem, Ballot, VoteDecision, VoteResults } from '../types/Vote';

class VotingService {
  private votes: VoteItem[] = [];
  private ballots: Ballot[] = [];

  async submitVote(
    voteId: string,
    shareholderId: string,
    decision: VoteDecision,
    votingPower: number
  ): Promise<Ballot> {
    // In a real implementation, this would be an API call
    const ballot: Ballot = {
      id: crypto.randomUUID(),
      voteId,
      shareholderId,
      decision,
      votingPower,
      timestamp: new Date(),
    };

    this.ballots.push(ballot);
    await this.updateVoteResults(voteId);
    
    return ballot;
  }

  private async updateVoteResults(voteId: string): Promise<void> {
    const voteBallots = this.ballots.filter(b => b.voteId === voteId);
    const vote = this.votes.find(v => v.id === voteId);

    if (!vote) return;

    const results: VoteResults = {
      totalVotes: voteBallots.length,
      totalVotingPower: voteBallots.reduce((sum, b) => sum + b.votingPower, 0),
      results: {
        FOR: voteBallots.filter(b => b.decision === 'FOR').length,
        AGAINST: voteBallots.filter(b => b.decision === 'AGAINST').length,
        ABSTAIN: voteBallots.filter(b => b.decision === 'ABSTAIN').length,
      },
      percentages: {
        FOR: 0,
        AGAINST: 0,
        ABSTAIN: 0,
      }
    };

    // Calculate percentages based on voting power
    const totalPower = results.totalVotingPower;
    if (totalPower > 0) {
      results.percentages.FOR = (voteBallots
        .filter(b => b.decision === 'FOR')
        .reduce((sum, b) => sum + b.votingPower, 0) / totalPower) * 100;
      
      results.percentages.AGAINST = (voteBallots
        .filter(b => b.decision === 'AGAINST')
        .reduce((sum, b) => sum + b.votingPower, 0) / totalPower) * 100;
      
      results.percentages.ABSTAIN = (voteBallots
        .filter(b => b.decision === 'ABSTAIN')
        .reduce((sum, b) => sum + b.votingPower, 0) / totalPower) * 100;
    }

    vote.results = results;
  }

  async getVoteResults(voteId: string): Promise<VoteResults | undefined> {
    const vote = this.votes.find(v => v.id === voteId);
    return vote?.results;
  }

  async hasVoted(voteId: string, shareholderId: string): Promise<boolean> {
    return this.ballots.some(b => b.voteId === voteId && b.shareholderId === shareholderId);
  }
}

export const votingService = new VotingService();
