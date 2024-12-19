import { Shareholder } from '../types/Shareholder';

class ShareholderService {
  private shareholders: Shareholder[] = [];

  async getAllShareholders(companyId: string): Promise<Shareholder[]> {
    // In a real implementation, this would fetch from an API
    return this.shareholders.filter(s => s.companyId === companyId);
  }

  async importShareholders(data: any[], companyId: string): Promise<Shareholder[]> {
    const newShareholders = data.map(row => ({
      id: crypto.randomUUID(),
      companyId,
      controlNumber: row.controlNumber,
      name: row.name,
      email: row.email,
      shares: Number(row.shares),
      votingPower: Number(row.shares), // Can be different from shares if implementing different share classes
      status: 'pending' as const,
      dateAdded: new Date(),
      documents: [],
      voteHistory: []
    }));

    // In a real implementation, this would be an API call
    this.shareholders.push(...newShareholders);
    return newShareholders;
  }

  async updateShareholderStatus(
    shareholderIds: string[],
    status: 'active' | 'pending' | 'suspended'
  ): Promise<void> {
    // In a real implementation, this would be an API call
    this.shareholders = this.shareholders.map(s => 
      shareholderIds.includes(s.id) ? { ...s, status } : s
    );
  }

  async deleteShareholders(shareholderIds: string[]): Promise<void> {
    // In a real implementation, this would be an API call
    this.shareholders = this.shareholders.filter(s => !shareholderIds.includes(s.id));
  }

  async sendEmailToShareholders(shareholderIds: string[], template: string, data: any): Promise<void> {
    // In a real implementation, this would integrate with an email service
    console.log('Sending email to shareholders:', shareholderIds, template, data);
  }
}

export const shareholderService = new ShareholderService();
