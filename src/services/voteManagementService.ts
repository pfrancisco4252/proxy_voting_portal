import { VoteItem } from '../types/Vote';
import { mockVotes } from './mockData';

class VoteManagementService {
  private votes: VoteItem[] = [...mockVotes];

  async getCompanyVotes(companyId: string): Promise<VoteItem[]> {
    // In a real implementation, this would filter by companyId
    return this.votes;
  }

  async createVote(companyId: string, vote: VoteItem): Promise<VoteItem> {
    this.votes.push(vote);
    return vote;
  }

  async updateVote(companyId: string, vote: VoteItem): Promise<VoteItem> {
    const index = this.votes.findIndex(v => v.id === vote.id);
    if (index !== -1) {
      this.votes[index] = vote;
    }
    return vote;
  }

  async deleteVote(companyId: string, voteId: string): Promise<void> {
    this.votes = this.votes.filter(vote => vote.id !== voteId);
  }

  async scheduleVote(voteId: string, schedule: any): Promise<void> {
    const vote = this.votes.find(v => v.id === voteId);
    if (vote) {
      vote.startDate = schedule.startDate;
      vote.endDate = schedule.endDate;
      vote.status = 'upcoming';
    }
  }
}

export const voteManagementService = new VoteManagementService();
